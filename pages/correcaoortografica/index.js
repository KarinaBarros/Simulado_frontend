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

export default function Ortografia() {
  useAuthentication();

  const [ortografia, setOrtografia] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { publicRuntimeConfig } = getConfig();
  const [pasteSuccess, setPasteSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${publicRuntimeConfig.serverUrl}/ortografia`, { ortografia });

      router.push({
        pathname: '/correcaoortografica/textocorrigido',
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

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const paste = async () => {
    try {
      // Solicita permissão para acessar a área de transferência
      await navigator.permissions.query({ name: 'clipboard-read' });

      // Lê o texto da área de transferência
      const text = await navigator.clipboard.readText();

      // Cola o texto no textarea
      document.getElementById('targetId').value += text;
      setOrtografia(prevOrtografia => prevOrtografia + text);

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
            <div className='container-interger'>
              <div className='interger-top'>
                <div>
                <h1 className="cores orientacao">Correção Ortográfica</h1>
                </div>
                <p className="descricao">Escreva ou cole seu texto aqui. A inteligência artificial vai corrigir a ortografia.</p>
              </div>
              <form onSubmit={handleSubmit} className='interger-bottom'>

                <p className="label_simulado">Texto:</p>
                <div className="container-textarea">
                  <textarea id="targetId" rows={15} className='textarea_simulado' type="text" value={ortografia} onChange={(e) => setOrtografia(e.target.value)} maxLength={5000} required />
                </div>
                <button type="button" onClick={paste} className="colar"><FontAwesomeIcon className="icon-colar" icon={faPaste} /> Colar:</button>
                {pasteSuccess && <span className="mensagem">{pasteSuccess}</span>}
                <button type="submit" className='button_simulado'>Corrigir<img src='/brilho.png' className='brilho' alt='ícone brilho'></img></button>


              </form>
            </div>


          </div>
        )}
      </div>
    </>
  );
}
