import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import axios from "axios";
import '../../app/globals.css';
import './simulado.css';

export default function Simulado() {
  const router = useRouter();
  const tema= localStorage.getItem('tema');
  const [simulado, setSimulado] = useState([]);

    useEffect(() => {
        async function fetchSimulado() {
            try {
                const response = await axios.get('http://localhost:3000/simulado');
                console.log('Simulado:', response.data);
                setSimulado(response.data);
            } catch (error) {
                console.error('Erro ao buscar o gabarito:', error);
                // Trate os erros conforme necessário
            }
        }
        fetchSimulado();
    }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = simulado.map(pergunta => {
        const respostaSelecionada = document.querySelector(`input[name="${pergunta.numero}"]:checked`);
        return respostaSelecionada ? respostaSelecionada.value : null;
      }).filter(resposta => resposta !== null);
      const response = await axios.post('http://localhost:3000/respostas', formData);
      
      
      
      router.push({
        pathname: '/gabarito',
      });
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      localStorage.removeItem('tema');
      
    }
  };
  
  

  return (
    <div>
      <h2>Simulado</h2>
      <p>{tema}</p>
      <form onSubmit={handleSubmit}>
        <br/><br/>
        {simulado.map((pergunta, index) => (
          <div key={index} className="questions">
            <p> {pergunta.numero}- {pergunta.pergunta}</p>
            <div className="options">
              {pergunta.opcoes.map((opcao, opcaoIndex) => (
                <label key={opcaoIndex} className='option-label' >
                  <input type="radio"  className="option-radio" value={opcao} name={pergunta.numero} required/> {opcao}
                </label>
              ))}
            </div>
            <br/>
          </div>
        ))}
        <button type="submit">Enviar Respostas</button>
      </form>
    </div>
  );
}




