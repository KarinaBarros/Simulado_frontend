import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import axios from "axios";
import '@/app/globals.css';
import '@/styles/principal.css';
import useAuthentication from "@/components/useAuthentication";
import getConfig from "next/config";
import Nav from "@/components/nav/nav";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaste } from '@fortawesome/free-solid-svg-icons';
import LottieAnimation from "@/components/lottie/lottie";
import Title from "@/components/title";

export default function Redacao() {
  useAuthentication();

  const [redacao, setRedacao] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { publicRuntimeConfig } = getConfig();
  const [pasteSuccess, setPasteSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${publicRuntimeConfig.serverUrl}/redacao`, { redacao });

      router.push({
        pathname: '/redacao/analise',
      });
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleClick = () => {
      setPasteSuccess('');
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const paste = async () => {
    try {
      await navigator.permissions.query({ name: 'clipboard-read' });

      const text = await navigator.clipboard.readText();

      document.getElementById('targetId').value += text;

      setRedacao(prevRedacao => prevRedacao + text);

    } catch (err) {
      setPasteSuccess('Falha ao colar, verifique as permissôes do navegador!');
    }
  };

  return (
    <>
      <Title />
      <div className={`simulado ${isLoading ? 'loading' : ''}`}>
        {isLoading ? (
          <div className='container_loading'>
            <p>Carregando...</p>
            <LottieAnimation />
          </div>
        ) : (
          <div className='container'>
            <Nav />
            <div className="container-interger">
              <div className='interger-top'>
                <div>
                  <h1 className="cores">Redação</h1>
                </div>
                <p className="descricao">Escreva ou cole sua redação aqui. A inteligência artificial vai avaliar sua redação e dar dicas de como melhora-la.</p>
              </div>
              <form onSubmit={handleSubmit} className='interger-bottom'>
                <p className="label_simulado">Redação:</p>
                <div className="container-textarea">
                  <textarea id="targetId" rows={15} className='textarea_simulado' type="text" value={redacao} onChange={(e) => setRedacao(e.target.value)} maxLength={10000} required />
                </div>
                <button type="button" onClick={paste} className="colar"><FontAwesomeIcon className="icon-colar" icon={faPaste} /> Colar:</button>
                {pasteSuccess && <span className="mensagem">{pasteSuccess}</span>}
                <button type="submit" className='button_simulado'>Analisar<img src='/brilho.png' className='brilho' alt='ícone brilho'></img></button>
              </form>
            </div>

          </div>
        )}
      </div>
    </>
  );
}