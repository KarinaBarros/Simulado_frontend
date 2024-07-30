import Title from '@/components/title';
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import getConfig from 'next/config';
import '@/app/globals.css';
import '@/styles/login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { publicRuntimeConfig } = getConfig();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${publicRuntimeConfig.serverUrl}/login`, { email, senha });
      const { token, nome, nivel, curso } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('email', email);
      localStorage.setItem('nome', nome);
      localStorage.setItem('nivel', nivel);
      localStorage.setItem('curso', curso);
      router.push({
        pathname: '/',
      });
    }
    catch (error) {
      if (error.response && error.response.status === 429) {
        setError('Limite de tentativas excedido, por favor, tente novamente mais tarde, se esqueceu sua senha altere a senha ou faça um novo cadastro.');
      } else {
        setError('Usuário ou senha inválidos!');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login'>
      <div className='container-login'>
        <div className='login-itens'>
          <Title />
          <h2>Login</h2>
          {error && <p>{error}</p>}
          <form onSubmit={handleSubmit} className='form-login'>
            <h3>Email</h3>
            <input
              className='input-login'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <h3>Senha</h3>
            <input
              className='input-login'
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <button type="submit" disabled={loading}>Login</button>
          </form>
          <Link className='link-login' href='/register'>Não tem uma conta? Cadastre-se:</Link>
          <Link className='link-login' href='/trocarsenha'>Esqueci minha Senha.</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
