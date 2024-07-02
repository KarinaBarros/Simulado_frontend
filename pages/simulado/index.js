import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import '@/app/globals.css';
import '@/styles/principal.css';
import Logout from "@/components/logout/logout";
import useAuthentication from "@/components/useAuthentication";
import getConfig from 'next/config';
import LottieAnimation from '@/components/lottie/lottie';

export default function Simulado() {
  useAuthentication();

  const [tema, setTema] = useState('');
  const [nivel, setNivel] = useState('');
  const [tipo, setTipo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { publicRuntimeConfig } = getConfig();

  const handleSubmit = async (event) => {
    localStorage.removeItem('tema');
    event.preventDefault();
    setIsLoading(true);

    if (tipo === "optativa") {
      try {
        const response = await axios.post(`${publicRuntimeConfig.serverUrl}/api`, { tema, nivel });

        localStorage.setItem('tema', tema);
        router.push({
          pathname: '/simulado/simuladooptativo',
        });
      } catch (error) {
        console.error('Erro ao enviar os dados:', error);
        localStorage.removeItem('tema');
        setIsLoading(false);
      }
    } else {
      try {
        const response = await axios.post(`${publicRuntimeConfig.serverUrl}/discursiva`, { tema, nivel });

        localStorage.setItem('tema', tema);
        router.push({
          pathname: '/simulado/simuladodiscursivo',
        });

      } catch (error) {
        console.error('Erro ao enviar os dados:', error);
        localStorage.removeItem('tema');
        setIsLoading(false);
      }
    }
  };

  return (
    <div className={`simulado ${isLoading ? 'loading' : ''}`}>
     
      {isLoading ? (
        <div className='container_loading'>
          <p>Carregando...</p>
          <LottieAnimation />
        </div>
      ) : (
        <div className='container'>
          <div className='container_form'>
            <div className='container_logo'>
              <img className='logo' src='/logo.png' alt='logotipo' />
              <p>IA Simulado</p>
            </div>
            <form onSubmit={handleSubmit} className='form_simulado'>
              <p className='descricao'>
                Utilize nossos campos de entrada para selecionar um tema específico, alinhado ao conteúdo que você está estudando, ao invés de escolher uma matéria ampla. Essa abordagem permite a geração de simulados mais direcionados e relevantes, facilitando o aprofundamento nos tópicos exatos que você precisa dominar. Além disso, escolha o nível de escolaridade correspondente ao seu estágio de aprendizado para garantir que os exercícios sejam apropriados ao seu conhecimento atual. Ao clicar em &quot;Gerar&quot;, você será redirecionado para uma página com um simulado gerado automaticamente, proporcionando uma prática focada e eficaz.
              </p>
              <p className='label_simulado'>
                Tipo de Avaliação:
                </p>
                <select className='input_simulado' value={tipo} onChange={(e) => setTipo(e.target.value)} required>
                  <option></option>
                  <option value="optativa">Optativa</option>
                  <option value="discursiva">Discursiva</option>
                </select>

                <p className='label_simulado'>
                Nível:
                </p>
                <select className='input_simulado' value={nivel} onChange={(e) => setNivel(e.target.value)} required>
                  <option></option>
                  <option value="Ensino fundamental">Ensino fundamental</option>
                  <option value="Ensino médio">Ensino médio</option>
                  <option value="Ensino técnico">Ensino técnico</option>
                  <option value="Pré-vestibular">Pré-vestibular</option>
                  <option value="Ensino superior">Ensino superior</option>
                </select>
              
              
              <p className='label_simulado'>
                Tema:
                </p>
                <input className='input_simulado' type="text" value={tema} onChange={(e) => setTema(e.target.value)} maxLength={50} required />
              
              <button type="submit" className='button_simulado'>Gerar<img src='/brilho.png' className='brilho' alt='ícone brilho'></img></button>
            </form>
          </div>

          <div className='container_imagem'>
            <img src='/IAprincipal.png' alt='Robô de inteligência artificial com livros.' className='ia_principal'></img>
          </div>
        </div>
      )}
    </div>
  );
}



