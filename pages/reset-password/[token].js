import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import getConfig from 'next/config';

export default function ResetPassword() {
  const router = useRouter();
  const { token } = router.query;
  const [newPassword, setNewPassword] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [message, setMessage] = useState('');
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
    setNewPassword(newSenha);
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

    if (newPassword !== confirmSenha) {
      console.error('A senha e a confirmação de senha não coincidem.');
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${publicRuntimeConfig.serverUrl}/reset-password`, { token, newPassword });
      localStorage.removeItem('token');
      localStorage.removeItem('nome');
      localStorage.removeItem('nivel');
      localStorage.removeItem('curso');
      localStorage.removeItem('temas');
      alert('Senha redefinida com sucesso');
      router.push('/login');
    } catch (error) {
      setMessage('Ocorreu um erro ao redefinir a senha');
    } finally {
      setLoading(false);
    }
  };

  const isValid = Object.values(validations).every(validation => validation);

  return (
    <div>
      <h1>Redefinir senha</h1>
      <form onSubmit={handleSubmit}>
        <input type="password"
          value={newPassword}
          onChange={handleChange}
          required />
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
        <button type="submit" disabled={!isValid || newPassword !== confirmSenha}>{loading ? 'Register' : 'Register'}</button>
      </form>
      <p>{message}</p>

    </div>
  );
}
