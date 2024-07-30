import { useEffect, useState } from "react";
import getConfig from "next/config";
import axios from 'axios';
import useAuthentication from "./useAuthentication";

export default function SaveTemas() {
  useAuthentication();
  
  const [nivel, setNivel] = useState(null);
  const [curso, setCurso] = useState(null);
  const [temas, setTemas] = useState(null);
  const { publicRuntimeConfig } = getConfig();

  useEffect(() => {
    const Nivel = localStorage.getItem('nivel');
    const Curso = localStorage.getItem('curso');
    if (Nivel) {
      setNivel(Nivel);
      setCurso(Curso);
    }
  }, []);

  useEffect(() => {
    const Temas = localStorage.getItem('temas');
    
    if (Temas) {
     setTemas(Temas);
    }
  }, []);

  useEffect(() => {
    if (nivel && !temas ) {
      const fetchData = async () => {
        try {
          
          const response = await axios.post(`${publicRuntimeConfig.serverUrl}/temas`, { curso, nivel });
          const temas = response.data;
          localStorage.setItem('temas', JSON.stringify(temas));
        } catch (error) {
          console.error('Erro ao enviar os dados:', error);
        }
      };

      fetchData();
    }
  }, [nivel, curso, publicRuntimeConfig.serverUrl]);


  return null;
}


