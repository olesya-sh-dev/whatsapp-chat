import React, { useState } from 'react';

interface LoginProps {
  onLogin: (idInstance: string, apiTokenInstance: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [idInstance, setIdInstance] = useState('');
  const [apiTokenInstance, setApiTokenInstance] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(idInstance, apiTokenInstance);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="idInstance"
        value={idInstance}
        onChange={(e) => setIdInstance(e.target.value)}
      />
      <input
        type="text"
        placeholder="apiTokenInstance"
        value={apiTokenInstance}
        onChange={(e) => setApiTokenInstance(e.target.value)}
      />
      <button type="submit">Войти</button>
    </form>
  );
};

export default Login;