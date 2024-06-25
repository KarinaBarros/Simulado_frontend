import { useState } from "react";
import { useRouter } from 'next/router';
import axios from "axios";
import '@/app/globals.css';
import '@/styles/principal.css';
import useAuthentication from "@/components/useAuthentication";
import getConfig from "next/config";
import Logout from "@/components/logout/logout";

export default function Resumo(){
    useAuthentication();

    const [resumo, setResumo] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [formVisible, setFormVisible] = useState(true); // Controla a visibilidade do formulário
    const router = useRouter();
    const { publicRuntimeConfig } = getConfig();
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      setIsLoading(true);
  
      try {
        const response = await axios.post(`${publicRuntimeConfig.serverUrl}/resumo`, { resumo });
        
        router.push({
          pathname: '/resumo/textoresumido',
        });
        setFormVisible(false);
      } catch (error) {
        console.error('Erro ao enviar os dados:', error);
        setFormVisible(false);
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className='simulado'>
        <Logout/>
        {isLoading ? (
          <div className='container_loading'>
            <p>Carregando...</p>
            <div className="loading"></div>
          </div>
        ) : (
          <div className='container'>
            {formVisible && (
              <form onSubmit={handleSubmit} className='form_home'>
                <div className='container_logo'>
                <img className='logo' src='/logo.png' alt='logotipo'/>
                <p>IA Simulado</p>
              </div>
                <p>Cole seu texto aqui:</p> 
                <textarea  rows={20} className='input_home' type="text" value={resumo} onChange={(e) => setResumo(e.target.value)} maxLength={10000} required />
                <button type="submit" className='button_home'>Resumir<img src='/brilho.png' className='brilho' alt='ícone brilho'></img></button>
              </form>
            )}
            <div className='container_imagem'>
              <img src='/IAprincipal.png' alt='Robô de inteligência artificial com livros.' className='ia_principal'></img>
            </div>
          </div>
        )}
      </div>
    );
}