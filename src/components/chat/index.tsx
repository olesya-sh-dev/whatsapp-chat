import { useState, useRef, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import style from './styles.module.scss';
import { SendMessageProps, Message } from '../../types/types';
import { useReceiveMessages } from '../../hooks/useReceiveMessages';
import { useSendMessage } from '../../hooks/useSendMessage';

export const Chat = ({ idInstance, apiTokenInstance }: SendMessageProps) => {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [incomingMessages, setIncomingMessages] = useState<Message[]>([]);
  const [chatStartedByUser, setChatStartedByUser] = useState(false);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { sendMessage: sendMessageHook } = useSendMessage();
  useReceiveMessages(
    idInstance,
    apiTokenInstance,
    setIncomingMessages,
    phone,
    setPhone,
    chatStartedByUser
  );

  const handleSendMessage = async () => {
    if (!phone) {
      toast.error('Пожалуйста, введите номер телефона.');
      return;
    }
    if (phoneError) {
      toast.error('Номер телефона должен содержать только цифры.');
      return;
    }

    // Отправка сообщения через хук
    await sendMessageHook(
      idInstance,
      apiTokenInstance,
      phone,
      message,
      setIncomingMessages
    );
    setMessage('');
    setChatStartedByUser(true);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    // Проверка на наличие нецифровых символов
    if (/[^0-9]/.test(value)) {
      setPhoneError('номер телефона должен содержать только цифры');
    } else {
      setPhoneError(null);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [incomingMessages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = textareaRef.current.scrollHeight;
      const minHeight = 25;
      textareaRef.current.style.height = `${Math.max(newHeight, minHeight)}px`;
    }
  }, [message]);

  return (
    <div className={style.ChatContainer}>
      <input
        className="phone-input"
        type="text"
        placeholder="Введите номер телефона получателя"
        value={phone}
        onChange={handlePhoneChange}
        required
      />
      {phoneError && <p className={style.ErrorMessage}>{phoneError}</p>}
      <div className={style.Messages}>
        {incomingMessages.map((msg, index) => (
          <div
            key={index}
            className={`${style.Message} ${msg.isIncoming ? style.Incoming : style.Outgoing}`}
          >
            <p>{msg.text}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className={style.SendMessageForm}>
        <textarea
          ref={textareaRef}
          placeholder="Сообщение"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>{'>'}</button>
      </div>
      <ToastContainer />
    </div>
  );
};
