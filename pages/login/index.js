import LoginForm from '@/components/LoginForm';
import Title from '@/components/title';
import React from 'react';


const Login = () => {
  return (
    <div>
      <Title/>
      <h1>Login</h1>
      <LoginForm/>
      <p>Bem-vindo ao nosso site de simulados gerados por inteligência artificial! Nossa plataforma permite que você crie simulados sob medida, adaptados às suas necessidades de estudo. Comece agora a testar seus conhecimentos e aprimorar suas habilidades com nossos simulados personalizados</p>
    </div>
  );
};

export default Login;
