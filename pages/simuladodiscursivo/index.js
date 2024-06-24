import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import axios from "axios";
import '../../app/globals.css';
import '../simuladooptativo/simulado.css';
import useAuthentication from "@/components/useAuthentication";
import getConfig from "next/config";

export default function SimuladoDiscursivo() {
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

    useEffect(() => {
        async function fetchSimulado() {
          setLoading(true);
            try {
                const response = await axios.get(`${publicRuntimeConfig.serverUrl}/simuladoDiscursivo`);
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
        const respostaElement = document.querySelector(`textarea[name="${pergunta.numero}"]`);
        return {
          numero: pergunta.numero,
          resposta: respostaElement ? respostaElement.value : ''
        }; 
      });
      const response = await axios.post(`${publicRuntimeConfig.serverUrl}/respostasDiscursivo`, formData);
      router.push({
        pathname: '/gabaritoDiscursivo',
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
              
              <label className='option-label'>
                <textarea type="text" name={pergunta.numero} className="input-simulado" rows={3} maxLength={500} required/>
              </label>
              
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