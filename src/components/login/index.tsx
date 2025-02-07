import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import { Eye, EyeOff } from 'react-feather';
import style from './styles.module.scss';
import { useLogin } from '../../hooks/useLogin';
import { LoginForm, LoginProps } from '../../types/types';

const Login = ({ onLogin }: LoginProps) => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const { login, isLoading } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      await login(data.idInstance, data.apiTokenInstance);
      onLogin(data.idInstance, data.apiTokenInstance);
    } catch (error) {
      // Обработка ошибки
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

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Проверка...' : 'Войти'}
      </button>
    </form>
  );
};

 export default Login;


// import { useState, useEffect } from 'react';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { Eye, EyeOff } from 'react-feather';
// import style from './styles.module.scss';
// import { useReceiveNotificationQuery } from '../../api/whatsAppApi'; // Импортируем хук

// interface LoginProps {
//   onLogin: (idInstance: string, apiTokenInstance: string) => void;
// }

// interface LoginForm {
//   idInstance: string;
//   apiTokenInstance: string;
// }

// const Login = ({ onLogin }: LoginProps) => {
//   const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
//   const [showPassword, setShowPassword] = useState(false);

//   // Используем хук useReceiveNotificationQuery с параметром skip
//   const [queryParams, setQueryParams] = useState<{ idInstance: string; apiTokenInstance: string } | null>(null);
//   const { data, error, isLoading } = useReceiveNotificationQuery(queryParams || { idInstance: '', apiTokenInstance: '' }, {
//     skip: !queryParams, // Пропускаем запрос, пока queryParams не установлен
//   });

//   const onSubmit: SubmitHandler<LoginForm> = async (data) => {
//     // Устанавливаем параметры для запроса
//     setQueryParams({
//       idInstance: data.idInstance,
//       apiTokenInstance: data.apiTokenInstance,
//     });
//   };

//   // Проверяем состояние запроса и выполняем действия
//   useEffect(() => {
//     console.log('Data:', data);
//     console.log('Error:', error);
//     if (error) {
//       toast.error('Ошибка при проверке данных. Пожалуйста, попробуйте снова.');
//     }

//     if (data && !error) {
//       onLogin(queryParams!.idInstance, queryParams!.apiTokenInstance);
//     }
//   }, [data, error, queryParams, onLogin]);

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className={style.LoginForm}>
//       <input
//         {...register('idInstance', { required: 'Поле обязательно для заполнения' })}
//         placeholder="idInstance"
//       />
//       {errors.idInstance && <span className={style.ErrorMessage}>{errors.idInstance.message}</span>}

//       <div className={style.PasswordInput}>
//         <input
//           {...register('apiTokenInstance', { required: 'Поле обязательно для заполнения' })}
//           type={showPassword ? 'text' : 'password'}
//           placeholder="apiTokenInstance"
//         />
//         <button type="button" onClick={() => setShowPassword(!showPassword)}>
//           {showPassword ? <EyeOff /> : <Eye />}
//         </button>
//       </div>
//       {errors.apiTokenInstance && <span className={style.ErrorMessage}>{errors.apiTokenInstance.message}</span>}

//       <button type="submit" disabled={isLoading}>
//         {isLoading ? 'Проверка...' : 'Войти'}
//       </button>
//     </form>
//   );
// };

// export default Login;



