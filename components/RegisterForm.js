import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import Link from 'next/link';

const RegisterForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [nome, setNome] = useState('');
  const { publicRuntimeConfig } = getConfig();
  const [loading, setLoading] = useState(false);
  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    specialChar: false,
    number: false
  });

  const handleChange = (event) => {
    const newSenha = event.target.value;
    setSenha(newSenha);
    // Realizar as validações
    const newValidations = {
      length: newSenha.length >= 8,
      uppercase: /[A-Z]/.test(newSenha),
      lowercase: /[a-z]/.test(newSenha),
      specialChar: /[+=!@#$%^&*(),.?":{}|<>]/.test(newSenha),
      number: /[0-9]/.test(newSenha)
    };
    setValidations(newValidations);
  };

  const handleConfirmSenhaChange = (event) => {
    setConfirmSenha(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Verificar se todas as validações são verdadeiras
    const isValid = Object.values(validations).every(validation => validation);
    if (!isValid) {
      console.error('A senha não atende aos critérios.');
      return;
    }

    // Verificar se a senha e a confirmação de senha são iguais
    if (senha !== confirmSenha) {
      console.error('A senha e a confirmação de senha não coincidem.');
      return;
    }

    try {
      const response = await axios.post(`${publicRuntimeConfig.serverUrl}/register`, { nome, email, senha });
      console.log(response.data);
      alert('Enviamos um email com um link para a confirmação do cadastro!')
      
      // Implemente redirecionamento ou ação após o registro bem-sucedido
    } catch (error) {
      console.error('Erro:', error.response.data.error);
      alert('Esse email já está cadastrado. Faça o login ou cadastre outro email!')
    } finally {
      setLoading(false); // Desativar o estado de carregamento, independentemente do resultado
    }
  };

  // Move a verificação de isValid para fora de handleSubmit para que possa ser usada no retorno do componente
  const isValid = Object.values(validations).every(validation => validation);

  return (
    <form onSubmit={handleSubmit}>
      <label>
      <input type='checkbox' required/>
      <Link href='/politica'>Concordo com a política de uso.</Link>
      </label>
      <br/>
      <input
        placeholder='Nome'
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
        maxLength={45}
      />
      <br/>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        maxLength={45}
      />
      <br/>
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={handleChange}
        maxLength={20}
      /><br/>
      <input
        type="password"
        placeholder="Confirme a Senha"
        value={confirmSenha}
        onChange={handleConfirmSenhaChange}
        maxLength={20}
      />
      <div>
        <span style={{ color: validations.length ? 'green' : 'red' }}>Pelo menos 8 caracteres</span><br />
        <span style={{ color: validations.uppercase ? 'green' : 'red' }}>Pelo menos uma letra maiúscula</span><br />
        <span style={{ color: validations.lowercase ? 'green' : 'red' }}>Pelo menos uma letra minúscula</span><br />
        <span style={{ color: validations.specialChar ? 'green' : 'red' }}>Pelo menos um caracter especial</span><br />
        <span style={{ color: validations.number ? 'green' : 'red' }}>Pelo ao menos um número</span><br />
      </div>
      <button type="submit" disabled={!isValid || senha !== confirmSenha} >{loading ? 'Register' : 'Register'}</button>
    </form>
  );
};

export default RegisterForm;

