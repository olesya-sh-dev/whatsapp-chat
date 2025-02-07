import { useEffect } from 'react';
import axios from 'axios';
import { ReceiveNotificationResponse, Message } from '../types/types';

export const useReceiveMessages = (idInstance: string, apiTokenInstance: string, setIncomingMessages: React.Dispatch<React.SetStateAction<Message[]>>, phone: string, setPhone: React.Dispatch<React.SetStateAction<string>>, chatStartedByUser: boolean) => {

  const receiveMessage = async () => {
    try {
      const response = await axios.get<ReceiveNotificationResponse>(
        `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`
      );

      if (response.data) {
        const notification = response.data;
        const sender = notification.body.senderData.sender.replace('@c.us', '');

        if (notification.body.typeWebhook === 'incomingMessageReceived') {
          const messageData = notification.body.messageData;

          if (messageData.typeMessage === 'textMessage') {
            const textMessage = messageData.textMessageData.textMessage;

            if (!chatStartedByUser && !phone) {
              setPhone(sender);
            }

            setIncomingMessages((prev) => [...prev, { text: textMessage, isIncoming: true, sender }]);
          }
        }

        await axios.delete(
          `https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${notification.receiptId}`
        );
      }
    } catch (error) {
      console.error('Ошибка при получении сообщения:', error);
    }
  };

  useEffect(() => {
    const interval = setInterval(receiveMessage, 5000);
    return () => clearInterval(interval);
  }, []);
};
