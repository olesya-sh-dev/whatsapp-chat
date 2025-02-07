import axios from 'axios';
import { toast } from 'react-toastify';
import { Message } from '../types/types';
import { BASE_URL, WA_INSTANCE_PATH } from 'src/constants';

export const useSendMessage = () => {
  const sendMessage = async (
    idInstance: string,
    apiTokenInstance: string,
    phone: string,
    message: string,
    setIncomingMessages: React.Dispatch<React.SetStateAction<Message[]>>
  ) => {
    try {
      await axios.post(
        `${BASE_URL}${WA_INSTANCE_PATH(idInstance)}/SendMessage/${apiTokenInstance}`,
        {
          chatId: `${phone}@c.us`,
          message,
        }
      );

      // Добавляем исходящее сообщение только если отправка прошла успешно
      setIncomingMessages((prev) => [
        ...prev,
        { text: message, isIncoming: false, id: Date.now().toString() },
      ]);
      toast.success('Сообщение успешно отправлено.');
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error);
      toast.error('Не удалось отправить сообщение.');
    }
  };

  return { sendMessage };
};
