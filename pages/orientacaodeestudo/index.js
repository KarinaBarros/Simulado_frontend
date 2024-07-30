import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import axios from "axios";
import '@/app/globals.css';
import '@/styles/principal.css';
import useAuthentication from "@/components/useAuthentication";
import getConfig from "next/config";
import Nav from "@/components/nav/nav";
import LottieAnimation from "@/components/lottie/lottie";
import Title from "@/components/title";

export default function OrientacaoEstudo() {
  useAuthentication();

  const [tema, setTema] = useState('');
  const [nivel, setNivel] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [Loading, setLoading] = useState(true);
  const router = useRouter();
  const { publicRuntimeConfig } = getConfig();
  const [temas, setTemas] = useState([]);
  const [Nivel, setNivelStored] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${publicRuntimeConfig.serverUrl}/estudo`, { tema, nivel });

      router.push({
        pathname: '/orientacaodeestudo/orientacao',
      });
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const storedTemas = localStorage.getItem('temas');
      const storedNivel = localStorage.getItem('nivel');
      if (storedTemas) {
        setTemas(JSON.parse(storedTemas));
        setNivelStored(storedNivel);
        setLoading(false);
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

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
            <div className="left">
              <div className='container_logo'>
                <div>
                  <h1 className="cores orientacao">Orientação de estudo</h1>
                </div>
                <p className='descricao'>
                  Utilize nossos campos de entrada para selecionar um tema específico, alinhado ao conteúdo que você está estudando, ao invés de escolher uma matéria ampla. Essa abordagem permite a geração de uma orientação
                  de estudo mais direcionada e relevante, facilitando o aprofundamento nos tópicos exatos que você precisa dominar.
                </p>
              </div>


              <form onSubmit={handleSubmit} className='form_simulado'>
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
                <p className="label_simulado">
                  Tema:
                </p>
                <input className='input_simulado' type="text" value={tema} onChange={(e) => setTema(e.target.value)} maxLength={50} required />
                <button type="submit" className='button_simulado'>Gerar<img src='/brilho.png' className='brilho' alt='ícone brilho'></img></button>
                <br /><br /><br />
              </form>
            </div>
            {Loading ? (
              <div>Carregando...</div>
            ) : (
              <div className='right'>
                <h2>Para você!</h2>
                <p>Links rápidos</p>
                <form className="form-links" onSubmit={handleSubmit}>
                  {temas.map((Tema, index) => (
                    <div key={index}>
                      <button type="submit" className="link-rapido" onClick={() => { setNivel(Nivel); setTema(Tema); }}>{Tema}</button>
                    </div>
                  ))}
                </form>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
