import { useState } from 'react';
import axios from 'axios';
import getConfig from 'next/config';
import Title from '@/components/title';
import '@/app/globals.css';
import '@/styles/login.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const { publicRuntimeConfig } = getConfig();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${publicRuntimeConfig.serverUrl}/forgot-password`, { email });
      alert('Um e-mail foi enviado com instruções para redefinir sua senha, se não encontrar verifique a caixa de span!');
    } catch (error) {
      alert('Email não encontrado!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login'>
      <Title />
      <div className='container-login'>
        <div className='login-itens'>
          <h2>Alterar senha</h2>
          <form className='form-login' onSubmit={handleSubmit}>
            <h3>Email:</h3>
            <input className='input-login' type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button type="submit" disabled={loading}>Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
}
