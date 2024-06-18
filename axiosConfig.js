import axios from 'axios';

// Configurar o axios para enviar cookies em todas as requisições
axios.defaults.withCredentials = true;

// Configurar baseURL com variável de ambiente
axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_URL;

// Adicionar um interceptor para incluir o token em cada requisição
axios.interceptors.request.use(config => {
  const token = document.cookie.split('; ').find(row => row.startsWith('token='));
  if (token) {
    config.headers.Authorization = `Bearer ${token.split('=')[1]}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default axios;
