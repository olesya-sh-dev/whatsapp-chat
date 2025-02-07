import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  const login = async (idInstance: string, apiTokenInstance: string) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`
      );
      return response.data;
    } catch (error) {
      toast.error('Ошибка при проверке данных. Пожалуйста, попробуйте снова.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading };
};