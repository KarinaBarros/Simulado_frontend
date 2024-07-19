import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import getConfig from 'next/config';
import Link from 'next/link';
import Title from '@/components/title';
import '@/app/globals.css';
import '@/styles/login.css';

const Register = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [nome, setNome] = useState('');
  const [nivel, setNivel] = useState('');
  const [curso, setCurso] = useState('');
  const { publicRuntimeConfig } = getConfig();
  const [loading, setLoading] = useState(false);
  const [validacao, setValidacao] =useState('none');
  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    specialChar: false,
    number: false
  });

  // Atualiza o estado de curso com base no preenchimento de nivel
  const handleNivelChange = (event) => {
    const newNivel = event.target.value;
    setNivel(newNivel);

    // Verifica se nivel é "Ensino fundamental", "Ensino médio" ou vazio
    if (newNivel.trim().toLowerCase() === 'ensino fundamental' ||
      newNivel.trim().toLowerCase() === 'ensino médio' ||
      newNivel.trim().toLowerCase() === 'pré-vestibular' ||
      newNivel.trim() === '') {
      setCurso('');
    } else {
      setCurso('');
    }
  };

  const handleChange = (event) => {
    const newSenha = event.target.value;
    setSenha(newSenha);

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

    const isValid = Object.values(validations).every(validation => validation);
    if (!isValid) {
      console.error('A senha não atende aos critérios.');
      return;
    }

    if (senha !== confirmSenha) {
      console.error('A senha e a confirmação de senha não coincidem.');
      return;
    }

    try {
      const response = await axios.post(`${publicRuntimeConfig.serverUrl}/register`, { nome, email, senha, nivel, curso });
      console.log(response.data);
      alert('Enviamos um email com um link para a confirmação do cadastro, se não encontrar verifique a caixa de span!')
    } catch (error) {
      console.error('Erro:', error.response.data.error);
      alert('Esse email já está cadastrado. Faça o login ou cadastre outro email!')
    } finally {
      setLoading(false);
    }
  };

  const isValid = Object.values(validations).every(validation => validation);

  return (
    <div className='login'>
      <Title />
      <div className='container-login'>
        <div className='login-itens'>
          <h2>Cadastre-se</h2>
          <form onSubmit={handleSubmit} className='form-login'>
            <h3>Nome:</h3>
            <input
              className='input-login'
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              maxLength={45}
            />
            <h3>Email:</h3>
            <input
              className='input-login'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              maxLength={45}
            />
            <h3>Nível de escolaridade</h3>
            <select
              className='input-login'
              value={nivel}
              onChange={handleNivelChange}
              required
              maxLength={50}
            >
              <option ></option>
              <option value="Ensino fundamental">Ensino fundamental</option>
              <option value="Ensino médio">Ensino médio</option>
              <option value="Ensino técnico">Ensino técnico</option>
              <option value="Pré-vestibular">Pré-vestibular</option>
              <option value="Ensino superior">Ensino superior</option>
            </select>
            <h3>Curso:</h3>
            <input
              className='input-login'
              value={curso}
              onChange={(e) => setCurso(e.target.value)}
              disabled={nivel.trim().toLowerCase() === 'ensino fundamental' ||
                nivel.trim().toLowerCase() === 'ensino médio' ||
                nivel.trim().toLowerCase() === 'pré-vestibular' ||
                nivel.trim() === ''}
              required={nivel.trim().toLowerCase() !== 'ensino fundamental' &&
                nivel.trim().toLowerCase() !== 'ensino médio' &&
                nivel.trim().toLowerCase() !== 'pré-vestibular' &&
                nivel.trim() !== ''}
              maxLength={50}
            />
            <h3>Senha:</h3>
            <input
              className='input-login'
              type="password"
              value={senha}
              onChange={handleChange}
              maxLength={20}
              onFocus={() => setValidacao('flex')}
              onBlur={() => setValidacao('none')}
            />
            <div className='validacao' style={{display: validacao}}>
              <span style={{ backgroundColor: validations.length ? 'var(--verde)' : 'var(--rosa)' }}>Pelo menos 8 caracteres</span>
              <span style={{ backgroundColor: validations.uppercase ? 'var(--verde)' : 'var(--rosa)' }}>Pelo menos uma letra maiúscula</span>
              <span style={{ backgroundColor: validations.lowercase ? 'var(--verde)' : 'var(--rosa)' }}>Pelo menos uma letra minúscula</span>
              <span style={{ backgroundColor: validations.specialChar ? 'var(--verde)' : 'var(--rosa)' }}>Pelo menos um caracter especial</span>
              <span style={{ backgroundColor: validations.number ? 'var(--verde)' : 'var(--rosa)' }}>Pelo menos um número</span>
            </div>
            <h3>Confirmação de senha:</h3>
            <input
              className='input-login'
              type="password"
              value={confirmSenha}
              onChange={handleConfirmSenhaChange}
              maxLength={20}
            />            
            <label>
              <input type='checkbox' required />
              Concordo com a <Link href='/politica'>política de uso.</Link>
            </label>
            
            <button type="submit" disabled={!isValid || senha !== confirmSenha}>{loading ? 'Register' : 'Register'}</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;


