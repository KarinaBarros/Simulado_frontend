import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import './principal.css'

export default function Home() {

  const [tema, setTema] = useState('');
  const [nivel, setNivel] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar o carregamento
  const [errorCount, setErrorCount] = useState(0); // Estado para contar o número de erros
  const router = useRouter();

  const handleSubmit = async (event) => {
    localStorage.removeItem('tema');
    event.preventDefault();
    setIsLoading(true); // Define isLoading como true para mostrar a animação de carregamento
    
    try {
      const response = await axios.post('http://localhost:3000/api', { tema, nivel });
      
      // Armazena os dados no localStorage após a resposta da API ser recebida
      localStorage.setItem('tema', tema);
      

      router.push({
        pathname: '/simulado',
      });
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      localStorage.removeItem('tema');
      
      
      // Incrementa a contagem de erros
      setErrorCount(prevCount => prevCount + 1);
      
      // Exibe uma mensagem de erro ao usuário usando alert() se a contagem de erros for menor que 3
      if (errorCount < 3) {
        alert('Ocorreu um erro ao enviar os dados. Por favor reformule seu tema ou tente novamente.');
      } else {
        // Se a contagem de erros for igual a 3, exibe um alerta adicional
        alert('Erro no servidor, reformule sua pergunta ou tente novamente mais tarde!');
      }
    } finally {
      setIsLoading(false); // Define isLoading como false após o envio ou erro
    }
  };

  return (
    <div>
      {/* Renderiza o formulário apenas se isLoading for falso */}
      {!isLoading && (
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

      {/* Renderiza a animação de carregamento apenas se isLoading for verdadeiro */}
      {isLoading && <div className="loading"></div>}
    </div>
  );
}


