import { useState } from 'react';
import axios from 'axios';
import getConfig from 'next/config';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const { publicRuntimeConfig } = getConfig();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${publicRuntimeConfig.serverUrl}/forgot-password`, { email });
      setMessage('Um e-mail foi enviado com instruções para redefinir sua senha');
    } catch (error) {
      setMessage('Ocorreu um erro ao solicitar a troca de senha');
    } finally {
      setLoading(false); // Desativar o estado de carregamento, independentemente do resultado
    }
  };

  return (
    <div>
      <h1>Esqueci minha senha</h1>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button type="submit" disabled={loading}>Enviar</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
