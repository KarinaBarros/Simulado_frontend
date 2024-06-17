import LoginForm from '@/components/LoginForm';
import React from 'react';


const Login = () => {
  return (
    <div>
      <h1>Login</h1>
      <LoginForm/>
      <p>Bem-vindo ao nosso site de simulados gerados por inteligência artificial! Nossa plataforma permite que você crie simulados sob medida, adaptados às suas necessidades de estudo. Basta selecionar um tema e escolher o nível de escolaridade desejado nos nossos campos de entrada. Ao clicar em "Enviar", você será redirecionado para uma página que gera automaticamente um simulado baseado nas suas escolhas, oferecendo uma ferramenta eficaz e direcionada para o seu aprendizado. Comece agora a testar seus conhecimentos e aprimorar suas habilidades com nossos simulados personalizados</p>
    </div>
  );
};

export default Login;
