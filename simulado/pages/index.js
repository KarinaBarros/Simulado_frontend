import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Home() {
  const [tema, setTema] = useState('');
  const [nivel, setNivel] = useState('');
  const [errorCount, setErrorCount] = useState(0); // Estado para contar o número de erros
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3000/api', { tema, nivel });
      
      // Armazena os dados no localStorage após a resposta da API ser recebida
      localStorage.setItem('tema', tema);
      localStorage.setItem('data', JSON.stringify(response.data));

      router.push({
        pathname: '/simulado',
      });
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      localStorage.removeItem('tema');
      localStorage.removeItem('data');
      
      // Incrementa a contagem de erros
      setErrorCount(prevCount => prevCount + 1);
      
      // Exibe uma mensagem de erro ao usuário usando alert() se a contagem de erros for menor que 3
      if (errorCount < 3) {
        alert('Ocorreu um erro ao enviar os dados. Por favor reformule seu tema ou tente novamente.');
      } else {
        // Se a contagem de erros for igual a 3, exibe um alerta adicional
        alert('Erro no servidor, reformule sua pergunta ou tente novamente mais tarde!');
      }
    }
  };

  return (
    <div>
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
    </div>
  );
}


