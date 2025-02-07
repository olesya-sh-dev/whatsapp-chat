import axios from 'axios';
import { ReceiveNotificationResponse } from '../types/types';

// Общая функция для выполнения GET-запроса
export const fetchNotification = async (url: string) => {
  try {
    const response = await axios.get<ReceiveNotificationResponse | null>(url);
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении уведомления:', error);
    throw error;
  }
};
