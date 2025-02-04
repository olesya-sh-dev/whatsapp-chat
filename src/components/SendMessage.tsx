import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface SendMessageProps {
  idInstance: string;
  apiTokenInstance: string;
}

const SendMessage: React.FC<SendMessageProps> = ({ idInstance, apiTokenInstance }) => {
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [incomingMessages, setIncomingMessages] = useState<string[]>([]);

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
      alert('Сообщение отправлено!');
      setMessage('');
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error);
      alert('Не удалось отправить сообщение.');
    }
  };

  // Получение входящих сообщений
  const receiveMessage = async () => {
    try {
      const response = await axios.get(
        `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`
      );

      console.log('Ответ от ReceiveNotification:', response.data); // Логируем ответ

      if (response.data) {
        const notification = response.data;

        // Проверяем тип уведомления
        if (notification.body.typeWebhook === 'incomingMessageReceived') {
          const messageData = notification.body.messageData;

          // Проверяем тип сообщения
          if (messageData.typeMessage === 'textMessage') {
            const textMessage = messageData.textMessageData.textMessage;

            // Добавляем сообщение в список входящих
            setIncomingMessages((prev) => [...prev, textMessage]);
          }
        }

        // Удаляем уведомление после обработки
        await axios.delete(
          `https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${notification.receiptId}`
        );
      } else {
        console.log('Нет новых уведомлений.'); // Логируем, если ответ null
      }
    } catch (error) {
      console.error('Ошибка при получении сообщения:', error);
    }
  };

  // Проверка входящих сообщений при изменении состояния
  useEffect(() => {
    const interval = setInterval(receiveMessage, 5000); // Проверка каждые 5 секунд
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Отправка сообщения</h2>
      <input
        type="text"
        placeholder="Номер телефона"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="text"
        placeholder="Сообщение"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Отправить</button>

      <h2>Входящие сообщения</h2>
      <ul>
        {incomingMessages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
};

export default SendMessage;