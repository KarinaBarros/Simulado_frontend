import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import axios from "axios";
import '../../app/globals.css';
import './simulado.css';
import useAuthentication from "@/components/useAuthentication";
import Logout from "@/components/logout/logout";
import getConfig from "next/config";

export default function Simulado() {
  const [loading, setLoading] = useState(false);
  useAuthentication();
  const router = useRouter();
  const [simulado, setSimulado] = useState([]);
  const [tema, setTema] = useState(null);
  const { publicRuntimeConfig } = getConfig();

  useEffect(() => {
      const tema = localStorage.getItem('tema');
      setTema(tema ? tema : '');
  }, []);
  //https://simulado-frontend.vercel.app/

    useEffect(() => {
        async function fetchSimulado() {
          setLoading(true);
            try {
                const response = await axios.get(`${publicRuntimeConfig.serverUrl}/simulado`);
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
      const response = await axios.post(`${publicRuntimeConfig.serverUrl}/respostas`, formData);
      router.push({
        pathname: '/gabarito',
      });
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      localStorage.removeItem('tema');   
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div>
      <div className="header">
        <img src="IA.png" className="img-IA" alt="robozinho de inteligência artificial"/>
        <div className="text-header">
          <h2>Simulado</h2>
          <p>{tema}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <br/><br/>
        {simulado.map((pergunta, index) => (
          <div key={index} className="questions">
            <p> {pergunta.numero}- {pergunta.pergunta}</p>
            <br/>
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
        <div className="button">
          <button type="submit" className="enviar">{loading ? 'Enviar respostas' : ' '}</button>
        </div>
      </form>
    </div>
  );
}




