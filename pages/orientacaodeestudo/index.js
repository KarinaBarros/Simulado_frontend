import { useState } from "react";
import { useRouter } from 'next/router';
import axios from "axios";
import '@/app/globals.css';
import '@/styles/principal.css';
import useAuthentication from "@/components/useAuthentication";
import getConfig from "next/config";
import Logout from "@/components/logout/logout";

export default function OrientacaoEstudo(){
    useAuthentication();

    const [tema, setTema] = useState('');
    const [nivel, setNivel] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [formVisible, setFormVisible] = useState(true); // Controla a visibilidade do formulário
    const router = useRouter();
    const { publicRuntimeConfig } = getConfig();
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      setIsLoading(true);
  
      try {
        const response = await axios.post(`${publicRuntimeConfig.serverUrl}/estudo`, { tema, nivel });
        
        router.push({
          pathname: '/orientacaodeestudo/orientacao',
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
              <br/><br/>
                <label className="label_home">
                Tema:
                <input  className='input_home' type="text" value={tema} onChange={(e) => setTema(e.target.value)} maxLength={50} required />
                </label>
                <label className='label_home'>
                Nível:
                <select className='input_home' value={nivel} onChange={(e) => setNivel(e.target.value)} required>
                  <option></option>
                  <option value="Ensino fundamental">Ensino fundamental</option>
                  <option value="Ensino médio">Ensino médio</option>
                  <option value="Ensino técnico">Ensino técnico</option>
                  <option value="Pré-vestibular">Pré-vestibular</option>
                  <option value="Ensino superior">Ensino superior</option>
                </select>
              </label>
                <button type="submit" className='button_home'>Gerar<img src='/brilho.png' className='brilho' alt='ícone brilho'></img></button>
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