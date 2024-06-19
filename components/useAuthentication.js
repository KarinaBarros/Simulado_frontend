import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const useAuthentication = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    if (!token) {
      router.push('/login'); // Redireciona para a página de login se o token não estiver presente
    }
  }, []);

  return null; // Este hook apenas realiza a verificação e não renderiza nenhum componente
};

export default useAuthentication;

