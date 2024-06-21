import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import '../app/globals.css'
import './principal.css';
import Logout from "@/components/logout/logout";
import useAuthentication from "@/components/useAuthentication";
import getConfig from 'next/config';

export default function Home() {
  useAuthentication();

  const [tema, setTema] = useState('');
  const [nivel, setNivel] = useState('');
  const [tipo, setTipo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [formVisible, setFormVisible] = useState(true); // Controla a visibilidade do formulário
  const router = useRouter();
  const { publicRuntimeConfig } = getConfig();

  const handleSubmit = async (event) => {
    localStorage.removeItem('tema');
    event.preventDefault();
    setIsLoading(true);

    if(tipo === "optativa"){
    try {
      const response = await axios.post(`${publicRuntimeConfig.serverUrl}/api`, { tema, nivel });
      
      localStorage.setItem('tema', tema);
      router.push({
        pathname: '/simulado',
      });
      setFormVisible(false);
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      localStorage.removeItem('tema');
      
      setErrorCount(prevCount => prevCount + 1);
      
      if (errorCount < 3) {
        alert('Ocorreu um erro ao enviar os dados. Por favor reformule seu tema ou tente novamente.');
      } else {
        alert('Erro no servidor, reformule sua pergunta ou tente novamente mais tarde!');
      }
    } finally {
      setIsLoading(false); // Esconde o formulário após o envio
    }}else{
      try {
        const response = await axios.post(`${publicRuntimeConfig.serverUrl}/discursiva`, { tema, nivel });
        
        localStorage.setItem('tema', tema);
        router.push({
          pathname: '/simuladodiscursivo',
        });
        setFormVisible(false);
      } catch (error) {
        console.error('Erro ao enviar os dados:', error);
        localStorage.removeItem('tema');
        
        setErrorCount(prevCount => prevCount + 1);
        
        if (errorCount < 3) {
          alert('Ocorreu um erro ao enviar os dados. Por favor reformule seu tema ou tente novamente.');
        } else {
          alert('Erro no servidor, reformule sua pergunta ou tente novamente mais tarde!');
        }
      } finally {
        setIsLoading(false); // Esconde o formulário após o envio
      }
    }
  };

  return (
    <div className='home'>
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
              <p className='descricao'> Utilize nossos campos de entrada para selecionar um tema específico, alinhado ao conteúdo que você está estudando, ao invés de escolher uma matéria ampla. Essa abordagem permite a geração de simulados mais direcionados e relevantes, facilitando o aprofundamento nos tópicos exatos que você precisa dominar. Além disso, escolha o nível de escolaridade correspondente ao seu estágio de aprendizado para garantir que os exercícios sejam apropriados ao seu conhecimento atual. Ao clicar em &quot;Gerar&quot;, você será redirecionado para uma página com um simulado gerado automaticamente, proporcionando uma prática focada e eficaz.</p>
              <label className='label_home'>
                Tipo de Avaliação:
                <select className='input_home' value={tipo} onChange={(e) => setTipo(e.target.value)} required>
                  <option></option>
                  <option value="optativa">Optativa</option>
                  <option value="discursiva">Discursiva</option>
                </select>
              </label>
              <label className='label_home'>
                Tema:
                <input className='input_home' type="text" value={tema} onChange={(e) => setTema(e.target.value)} maxLength={50} required />
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



