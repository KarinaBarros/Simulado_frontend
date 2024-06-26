import { useState,useEffect } from "react";
import { useRouter } from 'next/router';
import axios from "axios";
import '@/app/globals.css';
import '@/styles/principal.css';
import useAuthentication from "@/components/useAuthentication";
import getConfig from "next/config";
import Logout from "@/components/logout/logout";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaste} from '@fortawesome/free-solid-svg-icons';
import LottieAnimation from "@/components/lottie/lottie";

export default function Redacao(){
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
        
      } catch (err) {
        setPasteSuccess('Falha ao colar, verifique as permissôes do navegador!');
      }
    };

    return (
      <div className={`simulado ${isLoading ? 'loading' : ''}`}>
        <Logout/>
        {isLoading ? (
          <div className='container_loading'>
            <p>Carregando...</p>
            <LottieAnimation/>
          </div>
        ) : (
          <div className='container'>
              <form onSubmit={handleSubmit} className='form_home'>
                <div className='container_logo'>
                <img className='logo' src='/logo.png' alt='logotipo'/>
                <p>IA Simulado</p>
              </div>
              <div>
                <div className="container-colar">
                  <button onClick={paste} className="colar"><FontAwesomeIcon icon={faPaste} /> Colar:</button> 
                  {pasteSuccess && <span className="mensagem">{pasteSuccess}</span>}
                </div>
                <textarea id="targetId" rows={17} className='textarea_home' type="text" value={redacao} onChange={(e) => setRedacao(e.target.value)} maxLength={10000} required />
                </div>
                <button type="submit" className='button_home'>Analisar<img src='/brilho.png' className='brilho' alt='ícone brilho'></img></button>
              </form>
            <div className='container_imagem'>
              <img src='/IAprincipal.png' alt='Robô de inteligência artificial com livros.' className='ia_principal'></img>
            </div>
          </div>
        )}
      </div>
    );
}