import React, { useState } from 'react';
import Login from './components/Login';
import SendMessage from './components/SendMessage';

const App: React.FC = () => {
  const [idInstance, setIdInstance] = useState<string | null>(null);
  const [apiTokenInstance, setApiTokenInstance] = useState<string | null>(null);

  const handleLogin = (idInstance: string, apiTokenInstance: string) => {
    setIdInstance(idInstance);
    setApiTokenInstance(apiTokenInstance);
  };

  return (
    <div>
      {!idInstance || !apiTokenInstance ? (
        <Login onLogin={handleLogin} />
      ) : (
        <SendMessage idInstance={idInstance} apiTokenInstance={apiTokenInstance} />
      )}
    </div>
  );
};

export default App;
