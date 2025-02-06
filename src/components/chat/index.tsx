import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import style from './styles.module.scss';
import { SendMessageProps, Message, Notification} from './types';

export const Chat = ({ idInstance, apiTokenInstance }: SendMessageProps) => {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [incomingMessages, setIncomingMessages] = useState<Message[]>([]);
  const [chatStartedByUser, setChatStartedByUser] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Отправка сообщения
  const sendMessage = async () => {
    try {
      await axios.post(
        `https://api.green-api.com/waInstance${idInstance}/SendMessage/${apiTokenInstance}`,
        {
          chatId: `${phone}@c.us`,
          message,
        }
      );

      setIncomingMessages((prev) => [...prev, { text: message, isIncoming: false }]); // Добавляем исходящее сообщение
      setMessage('');
      setChatStartedByUser(true); // Устанавливаем флаг, что чат начат пользователем
      toast.success('Сообщение успешно отправлено.');
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error);
      toast.error('Не удалось отправить сообщение.'); // Показываем ошибку в тосте
    }
  };

  // Получение входящих сообщений
  const receiveMessage = async () => {
    try {
      const response = await axios.get(
        `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`
      );

      if (response.data) {
        const notification: Notification = response.data;
        const sender = notification.body.senderData.sender.replace('@c.us', '');

        // Проверяем тип уведомления
        if (notification.body.typeWebhook === 'incomingMessageReceived' as string) {
          const messageData = notification.body.messageData;

          // Проверяем тип сообщения
          if (messageData.typeMessage === 'textMessage') {
            const textMessage = messageData.textMessageData.textMessage;

            // Если чат еще не начат пользователем, устанавливаем номер телефона
            if (!chatStartedByUser && !phone) {
              setPhone(sender);
            }

            // Добавляем сообщение в список входящих
            setIncomingMessages((prev) => [...prev, { text: textMessage, isIncoming: true, sender }]);
          }
        }

        // Удаляем уведомление после обработки
        await axios.delete(
          `https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${notification.receiptId}`
        );
      }
    } catch (error) {
      console.error('Ошибка при получении сообщения:', error);
    }
  };

  // Проверка входящих сообщений при изменении состояния
  useEffect(() => {
    const interval = setInterval(receiveMessage, 5000); 
    return () => clearInterval(interval);
  }, []);

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
      textareaRef.current.style.height = Math.max(newHeight, minHeight) + 'px';
    }
  }, [message]);

  return (
    <div className={style.ChatContainer}>
      <input
        className="phone-input"
        type="text"
        placeholder="Введите номер телефона получателя"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <div className={style.Messages}>
        {incomingMessages.map((msg, index) => (
          <div key={index} className={`${style.Message} ${msg.isIncoming ? style.Incoming : style.Outgoing}`}>
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
        <button onClick={sendMessage}>
          {'>'}
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};
