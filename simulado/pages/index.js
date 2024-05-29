import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import './principal.css';

export default function Home() {
  const [tema, setTema] = useState('');
  const [nivel, setNivel] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [formVisible, setFormVisible] = useState(true); // Controla a visibilidade do formulário
  const router = useRouter();

  const handleSubmit = async (event) => {
    localStorage.removeItem('tema');
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/api', { tema, nivel });
      
      localStorage.setItem('tema', tema);
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      localStorage.removeItem('tema');
      
      setErrorCount(prevCount => prevCount + 1);
      
      if (errorCount < 3) {
        alert('Ocorreu um erro ao enviar os dados. Por favor reformule seu tema ou tente novamente.');
      } else {
        alert('Erro no servidor, reformule sua pergunta ou tente novamente mais tarde!');
      }
    } finally {
      setIsLoading(false);
      setFormVisible(false); // Esconde o formulário após o envio
      router.push({
        pathname: '/simulado',
      });
    }
  };

  return (
    <div>
      {formVisible && !isLoading && ( // Mostra o formulário se formVisible for verdadeiro e não estiver carregando
        <form onSubmit={handleSubmit}>
          <label>
            Tema:
            <input type="text" value={tema} onChange={(e) => setTema(e.target.value)} required />
          </label>
          <label>
            Nível:
            <select value={nivel} onChange={(e) => setNivel(e.target.value)} required>
              <option value="opcao1">Ensino fundamental</option>
              <option value="opcao2">Ensino médio</option>
              <option value="opcao3">Ensino técnico</option>
              <option value="opcao4">Pré-vestibular</option>
              <option value="opcao5">Ensino superior</option>
            </select>
          </label>
          <button type="submit">Enviar</button>
        </form>
      )}

      {isLoading && <div className="loading"></div>}
    </div>
  );
}



