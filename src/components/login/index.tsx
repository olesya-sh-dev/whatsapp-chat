import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import { Eye, EyeOff } from 'react-feather';
import style from './styles.module.scss';
import { useLogin } from '../../hooks/useLogin';
import { LoginForm, LoginProps } from '../../types/types';

const Login = ({ onLogin }: LoginProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();
  const { login, isLoading } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      await login(data.idInstance, data.apiTokenInstance);
      onLogin(data.idInstance, data.apiTokenInstance);
    } catch (error) {
      console.error('Ошибка при входе в аккаунт:', error);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit)(e).catch((error) => {
          console.error('Error submitting form:', error);
        });
      }}
      className={style.LoginForm}
    >
      <input
        {...register('idInstance', {
          required: 'Поле обязательно для заполнения',
        })}
        placeholder="idInstance"
      />
      {errors.idInstance && (
        <span className={style.ErrorMessage}>{errors.idInstance.message}</span>
      )}

      <div className={style.PasswordInput}>
        <input
          {...register('apiTokenInstance', {
            required: 'Поле обязательно для заполнения',
          })}
          type={showPassword ? 'text' : 'password'}
          placeholder="apiTokenInstance"
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <EyeOff /> : <Eye />}
        </button>
      </div>
      {errors.apiTokenInstance && (
        <span className={style.ErrorMessage}>
          {errors.apiTokenInstance.message}
        </span>
      )}

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Проверка...' : 'Войти'}
      </button>
    </form>
  );
};

export default Login;
