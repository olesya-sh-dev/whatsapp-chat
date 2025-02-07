import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Eye, EyeOff } from 'react-feather';
import style from './styles.module.scss';
interface LoginProps {
  onLogin: (idInstance: string, apiTokenInstance: string) => void;
}
interface LoginForm {
  idInstance: string;
  apiTokenInstance: string;
}
const Login = ({ onLogin }: LoginProps) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      const response = await axios.get(
        `https://api.green-api.com/waInstance${data.idInstance}/ReceiveNotification/${data.apiTokenInstance}`
      );
      onLogin(data.idInstance, data.apiTokenInstance);
    } catch (error) {
      toast.error('Ошибка при проверке данных. Пожалуйста, попробуйте снова.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.LoginForm}>
      <input
        {...register('idInstance', { required: 'Поле обязательно для заполнения' })}
        placeholder="idInstance"
      />
      {errors.idInstance && <span className={style.ErrorMessage}>{errors.idInstance.message}</span>}

      <div className={style.PasswordInput}>
        <input
          {...register('apiTokenInstance', { required: 'Поле обязательно для заполнения' })}
          type={showPassword ? 'text' : 'password'}
          placeholder="apiTokenInstance"
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <EyeOff /> : <Eye />}
        </button>
      </div>
      {errors.apiTokenInstance && <span className={style.ErrorMessage}>{errors.apiTokenInstance.message}</span>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Проверка...' : 'Войти'}
      </button>
    </form>
  );
};

export default Login;