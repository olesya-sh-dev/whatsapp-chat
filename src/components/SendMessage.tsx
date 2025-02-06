import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

interface SendMessageProps {
  idInstance: string;
  apiTokenInstance: string;
}
interface Message {
  text: string;
  isIncoming: boolean;
  sender?: string; // Номер телефона отправителя
}
const SendMessage: React.FC<SendMessageProps> = ({ idInstance, apiTokenInstance }) => {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [incomingMessages, setIncomingMessages] = useState<Message[]>([]);

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
        const notification = response.data;

        // Проверяем тип уведомления
        if (notification.body.typeWebhook === 'incomingMessageReceived') {
          const messageData = notification.body.messageData;

          // Проверяем тип сообщения
          if (messageData.typeMessage === 'textMessage') {
            const textMessage = messageData.textMessageData.textMessage;
            const sender = messageData.senderData.sender; 
            
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
      //toast.error('Не удалось получить сообщение.'); // Показываем ошибку в тосте
    }
  };

  // Проверка входящих сообщений при изменении состояния
  useEffect(() => {
    const interval = setInterval(receiveMessage, 5000); // Проверка каждые 5 секунд
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="chat-container">
      <input
        className="phone-input"
        type="text"
        placeholder="Введите номер телефона получателя"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <div className="messages">
        {incomingMessages.map((msg, index) => (
          <div key={index} className={`message ${msg.isIncoming ? 'incoming' : 'outgoing'}`}>
           
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
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

export default SendMessage;
