import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const useAuthentication = () => {
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        router.push('/login');
        return;
      }

      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      try {
        await axios.get(`${publicRuntimeConfig.serverUrl}/protected`);
        console.log('Autenticação bem-sucedida');
      } catch (error) {
        console.error('Erro na autenticação', error);
        router.push('/login');
      }
    };

    checkToken();
  }, [router]);

  return null; // O hook não renderiza nada
};

export default useAuthentication;



