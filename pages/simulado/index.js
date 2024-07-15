import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import '@/app/globals.css';
import '@/styles/principal.css';
import useAuthentication from "@/components/useAuthentication";
import getConfig from 'next/config';
import LottieAnimation from '@/components/lottie/lottie';
import Nav from '@/components/nav/nav';
import Title from '@/components/title';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

export default function Simulado() {
  useAuthentication();
  const [tema, setTema] = useState('');
  const [nivel, setNivel] = useState('');
  const [tipo, setTipo] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { publicRuntimeConfig } = getConfig();
  const [Loading, setLoading] = useState(true);
  const [temas, setTemas] = useState([]);
  const [Nivel, setNivelStored] = useState(null);
  const [activeFormIndex, setActiveFormIndex] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const storedTemas = localStorage.getItem('temas');
      const storedNivel = localStorage.getItem('nivel');
      if (storedTemas) {
        setTemas(JSON.parse(storedTemas));
        setNivelStored(storedNivel);
        setLoading(false);
        clearInterval(intervalId); // Clear the interval once data is loaded
      }
    }, 1000); // Check every second

    // Cleanup function to clear the interval if the component unmounts
    return () => clearInterval(intervalId);
  }, []);

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

  const handleClick = (index) => {
    setActiveFormIndex(activeFormIndex === index ? null : index);
  };

  return (
    <>
    <Title/>
    <div className={`simulado ${isLoading ? 'loading' : ''}`}>
     
      {isLoading ? (
        <div className='container_loading'>
          <p>Carregando...</p>
          <LottieAnimation />
        </div>
      ) : (
        <div className='container'>
          <Nav/>
          <div className='left'>
            <div className='container_logo'>
              <div >
              <h1 className='cores'>Simulado</h1>
              </div>
              <p className='descricao'>
                Utilize nossos campos de entrada para selecionar um tema específico, alinhado ao conteúdo que você está estudando, ao invés de escolher uma matéria ampla. Essa abordagem permite a geração de simulados mais direcionados e relevantes, facilitando o aprofundamento nos tópicos exatos que você precisa dominar.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className='form_simulado'>
             
              
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
                <input className='input_simulado' type="text" value={tema} onChange={(e) => setTema(e.target.value)} maxLength={200} required />
              
              <button type="submit" className='button_simulado'>Gerar<img src='/brilho.png' className='brilho' alt='ícone brilho'></img></button>
            </form>
          </div>
          {Loading ? (
                  <div>Carregando...</div>
                ) : (
                  <div className='right'>
                    <h2>Para você!</h2>
                    <p>Links rápidos</p>
                    {temas.map((Tema, index) => (
                      <div key={index}>
                        <button onClick={() => handleClick(index)} className={`link-rapido ${activeFormIndex === index ? 'button-active' : 'link-rapido'}`}>{activeFormIndex === index ?  <FontAwesomeIcon icon={faChevronUp} className='icon-chevron'/> : <FontAwesomeIcon icon={faChevronDown} className='icon-chevron'/>} {Tema}</button>
                        {activeFormIndex === index && (<form onSubmit={handleSubmit} className='form-active'>
                        <button className='button-link' type="submit" onClick={() => {setNivel(Nivel);setTema(Tema);setTipo('optativa');}}>Simulado Optativo</button>
                        <button className='button-link' type="submit" onClick={() => {setNivel(Nivel);setTema(Tema);setTipo('discursiva')}}>Simulado Discursivo</button>
                        </form>
                        )}
                      </div>
                    
                    ))}
                  </div>
                )}
        </div>
      )}
    </div>
    </>
  );
}



