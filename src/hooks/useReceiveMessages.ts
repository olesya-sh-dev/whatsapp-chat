import { useCallback, useEffect } from 'react';
import axios from 'axios';
import { ReceiveNotificationResponse, Message } from '../types/types';

export const useReceiveMessages = (
  idInstance: string,
  apiTokenInstance: string,
  setIncomingMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  phone: string,
  setPhone: React.Dispatch<React.SetStateAction<string>>,
  chatStartedByUser: boolean
) => {
  const receiveMessage = useCallback(async () => {
    try {
      // Получаем уведомление
      const response = await axios.get<ReceiveNotificationResponse>(
        `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`
      );

      if (response.data) {
        const notification = response.data;

        // Получаем телефон отправителя
        const sender = notification.body.senderData.sender.replace('@c.us', '');

        const idMessage = notification.body.idMessage;

        // Проверяем тип уведомления
        if (notification.body.typeWebhook === 'incomingMessageReceived') {
          const messageData = notification.body.messageData;

          // Обрабатываем только текстовые сообщения
          if (messageData.typeMessage === 'textMessage') {
            const textMessage = messageData.textMessageData.textMessage;

            // Если чат не начат пользователем и номер телефона не установлен, устанавливаем его
            if (!chatStartedByUser && !phone) {
              setPhone(sender);
            }

            setIncomingMessages((prev) => {
              // Проверяем, не было ли это сообщение уже добавлено по idMessage
              const isDuplicate = prev.some((msg) => msg.id === idMessage);
              if (!isDuplicate) {
                return [
                  ...prev,
                  {
                    text: textMessage,
                    isIncoming: true,
                    sender,
                    id: idMessage,
                  },
                ];
              }
              return prev;
            });
          }
        }

        // Удаляем уведомление после обработки
        try {
          await axios.delete(
            `https://api.green-api.com/waInstance${idInstance}/DeleteNotification/${apiTokenInstance}/${notification.receiptId}`
          );
        } catch (error) {
          console.error('Ошибка при удалении уведомления:', error);
        }
      }
    } catch (error) {
      console.error('Ошибка при получении уведомления:', error);
    }
  }, [
    idInstance,
    apiTokenInstance,
    phone,
    chatStartedByUser,
    setIncomingMessages,
    setPhone,
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      receiveMessage().catch(console.error);
    }, 5000);
    return () => clearInterval(interval);
  }, [receiveMessage]);
};
