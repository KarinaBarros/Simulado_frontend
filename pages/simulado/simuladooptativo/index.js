import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import axios from "axios";
import '@/app/globals.css';
import '@/styles/simulado.css';
import useAuthentication from "@/components/useAuthentication";
import getConfig from "next/config";
import Title from "@/components/title";
import Nav from "@/components/nav/nav";

export default function SimuladoOptativo() {
  const [loading, setLoading] = useState(false);
  useAuthentication();
  const router = useRouter();
  const [simulado, setSimulado] = useState([]);
  const [tema, setTema] = useState(null);
  const { publicRuntimeConfig } = getConfig();
  const [quadradosAtivos, setQuadradosAtivos] = useState(Array(10).fill(false));

  useEffect(() => {
      const tema = localStorage.getItem('tema');
      setTema(tema ? tema : '');
  }, []);

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
        pathname: '/simulado/simuladooptativo/gabarito',
      });
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      localStorage.removeItem('tema');   
    } finally {
      setLoading(false);
    }
  };

  const quadradoAtivo = (index) => {
    setQuadradosAtivos(prevState => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });
  };
  
  

  return (
    <div className="container-simulado">
      <Title/>
      <Nav/>
      <div className="header">
        <img src="/IA.png" className="img-IA" alt="robozinho de inteligência artificial"/>
        <div className="text-header">
          <h2>Simulado:</h2>
          <p>{tema}</p>
        </div>
        <div className="quadrados">
        {simulado.map((_, index) => (
          <div key={index} className={`quadrado ${quadradosAtivos[index] ? 'quadrado-ativo' : ''}`}></div>
        ))}
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        
        {simulado.map((pergunta, index) => (
          <div key={index} className="questions">
            <p> {pergunta.numero}- {pergunta.pergunta}</p>
            <br/>
            <div className="options">
              {pergunta.opcoes.map((opcao, opcaoIndex) => (
                <label key={opcaoIndex} className='option-label' >
                  <input type="radio"  className="option-radio" value={opcao} name={pergunta.numero} onChange={() => quadradoAtivo(index)} required/> {opcao}
                </label>
              ))}
            </div>
            <br/>
          </div>
        ))}
        <div className="button">
          <button type="submit" className="enviar">{loading ? 'Corrigir' : ' '}</button>
        </div>
      </form>
    </div>
  );
}




