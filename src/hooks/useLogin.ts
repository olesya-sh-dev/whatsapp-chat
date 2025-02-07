import { useState } from 'react';
import { toast } from 'react-toastify';
import { BASE_URL, WA_INSTANCE_PATH } from 'src/constants';
import { fetchNotification } from 'src/utils/fetchNotification';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const login = async (idInstance: string, apiTokenInstance: string) => {
    // Устанавливаем состояние загрузки в true перед началом запроса
    setIsLoading(true);
    try {
      const url = `${BASE_URL}${WA_INSTANCE_PATH(idInstance)}/ReceiveNotification/${apiTokenInstance}`;
      const data = await fetchNotification(url);
      return data;
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
