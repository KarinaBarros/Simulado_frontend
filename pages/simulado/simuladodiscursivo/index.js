import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import axios from "axios";
import '@/app/globals.css';
import '@/styles/simulado.css';
import useAuthentication from "@/components/useAuthentication";
import getConfig from "next/config";
import Title from "@/components/title";
import Nav from "@/components/nav/nav";

export default function SimuladoDiscursivo() {
  const [loading, setLoading] = useState(false);
  useAuthentication();
  const router = useRouter();
  const [simulado, setSimulado] = useState([]);
  const [tema, setTema] = useState(null);
  const [respostas, setRespostas] = useState({});
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
        setLoading(false);
      }
    }
    fetchSimulado();
  }, []);

  const handleInputChange = (numero, value) => {
    setRespostas(prevState => ({
      ...prevState,
      [numero]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const formData = simulado.map(pergunta => ({
        numero: pergunta.numero,
        resposta: respostas[pergunta.numero] || ''
      }));
      const response = await axios.post(`${publicRuntimeConfig.serverUrl}/respostasDiscursivo`, formData);
      router.push({
        pathname: '/simulado/simuladodiscursivo/gabarito',
      });
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      localStorage.removeItem('tema');
      setLoading(false);
    }
  };

  return (
    <div className="container-simulado">
      <Title />
      <Nav />
      <div className="header">
        <img src="/IA.png" className="img-IA" alt="robozinho de inteligência artificial" />
        <div className="text-header">
          <h2>Simulado</h2>
          <p>{tema}</p>
        </div>
        <div className="quadrados">
          {simulado.map((pergunta, index) => (
            <div key={index} className={`quadrado ${respostas[pergunta.numero] ? 'quadrado-ativo' : ''}`}></div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {simulado.map((pergunta, index) => (
          <div key={index} className="questions">
            <p>{pergunta.numero} - {pergunta.pergunta}</p>
            <br />
            <div className="options">
              <label className='option-label'>
                <textarea
                  type="text"
                  name={pergunta.numero}
                  className="input-simulado"
                  rows={3}
                  maxLength={500}
                  required
                  onChange={(e) => handleInputChange(pergunta.numero, e.target.value)}
                />
              </label>
            </div>
            <br />
          </div>
        ))}
        <div className="button">
          <button type="submit" className="enviar">{loading ? 'Corrigir' : ' '}</button>
        </div>
      </form>
    </div>
  );
}
