import { useState } from 'react';
import Login from './components/login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Chat } from './components/chat';
import './styles/global.scss';

const App = () => {
  const [idInstance, setIdInstance] = useState<string | null>(null);
  const [apiTokenInstance, setApiTokenInstance] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const handleLogin = (idInstance: string, apiTokenInstance: string) => {
    setIdInstance(idInstance);
    setApiTokenInstance(apiTokenInstance);
    setIsLoggedIn(true);
  };

  return (
    <>
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Chat idInstance={idInstance!} apiTokenInstance={apiTokenInstance!} />
      )}
      <ToastContainer />
    </>
  );
};

export default App;
