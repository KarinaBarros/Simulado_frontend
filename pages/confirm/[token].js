import { useEffect } from 'react';
import { useRouter } from 'next/router';
import getConfig from 'next/config';

const ConfirmPage = () => {
  const router = useRouter();
  const { publicRuntimeConfig } = getConfig();

  useEffect(() => {
    // Função para confirmar o registro
    const confirmRegistration = async (token) => {
      try {
        // Configurações da requisição
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token }) // Passando o token no corpo da requisição
        };

        // Fazendo a requisição para a rota "/confirm"
        const response = await fetch(`${publicRuntimeConfig.serverUrl}/confirm`, requestOptions);
        if (!response.ok) {
          throw new Error('Erro ao confirmar registro');
        }
        
        const data = await response.json();
        alert('Cadastro confirmado com sucesso, faça o login!');
        router.push('/login');
      } catch (error) {
        console.error('Erro ao confirmar registro:', error);
        alert('Erro ao confirmar registro. Por favor, tente novamente.');
      }
    };

    // Captura o token da URL ao carregar a página
    const { token } = router.query;
    if (token) {
      confirmRegistration(token);
    }
  }, [router.query]);

  return (
    <div>
      
    </div>
  );
};

export default ConfirmPage;

