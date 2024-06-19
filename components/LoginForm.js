import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link';
import getConfig from 'next/config';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false); // Estado para controlar o carregamento
  const [error, setError] = useState(null); // Estado para armazenar mensagens de erro
  const router = useRouter();
  const { publicRuntimeConfig } = getConfig();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Ativar o estado de carregamento
    try {
      const response = await axios.post(`${publicRuntimeConfig.serverUrl}/login`, { email, senha });
      const { token, nome } = response.data;
      
      // Armazenar o token no localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('nome', nome);

      // Redirecionar para a página home
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
      setLoading(false); // Desativar o estado de carregamento, independentemente do resultado
    }
  };

  return (
    <div>
      {error && <p>{error}</p>} {/* Exibir mensagem de erro se existir */}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button type="submit" disabled={loading}> {/* Desativar o botão durante o carregamento */}
          Login
        </button>
      </form>
      <Link href='/register'>Não tem uma conta? Cadastre-se:</Link><br/>
      <Link href='/trocarsenha'>Esqueci minha Senha.</Link>
    </div>
  );
};

export default LoginForm;



