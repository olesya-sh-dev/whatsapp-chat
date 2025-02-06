import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Eye, EyeOff } from 'react-feather';

interface LoginProps {
  onLogin: (idInstance: string, apiTokenInstance: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Валидация данных
    if (!idInstance || !apiTokenInstance) {
      toast.error('Пожалуйста, заполните оба поля.');
      return;
    }

    // Проверка данных через API
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.green-api.com/waInstance${idInstance}/ReceiveNotification/${apiTokenInstance}`
      );

      // Если запрос успешен, вызываем onLogin
      onLogin(idInstance, apiTokenInstance);
    } catch (error: AxiosError | any) {
      if (error.response && (error.response.status === 403 || error.response.status === 401)) {
        toast.error('Некорректные данные. Проверьте idInstance и apiTokenInstance.');
      } else {
        toast.error('Ошибка при проверке данных. Пожалуйста, попробуйте снова.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Функция для переключения видимости пароля
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <input
        type="text"
        placeholder="idInstance"
        value={idInstance}
        onChange={(e) => setIdInstance(e.target.value)}
      />
      <div className="password-input-wrapper">
        <input

          type={showPassword ? 'text' : 'password'}
          placeholder="apiTokenInstance"
          value={apiTokenInstance}
          onChange={(e) => setApiTokenInstance(e.target.value)}
        />
        <button type="button" onClick={togglePasswordVisibility} className="password-toggle">
          {showPassword ? <EyeOff /> : <Eye />}
        </button>
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Проверка...' : 'Войти'}
      </button>
    </form>
  );
};

export default Login;


