import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ResponseData } from '../types/types';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const login = async (idInstance: string, apiTokenInstance: string) => {
    // Устанавливаем состояние загрузки в true перед началом запроса
    setIsLoading(true);
    try {
      const response = await axios.get<ResponseData>(
        `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`
      );
      // Возвращаем данные ответа, если запрос успешен
      return response.data;
    } catch (error) {
      toast.error('Ошибка при проверке данных. Пожалуйста, попробуйте снова.');
      throw error;
    } finally {
      // Устанавливаем состояние загрузки в false после завершения запроса
      setIsLoading(false);
    }
  };

  return { login, isLoading };
};
