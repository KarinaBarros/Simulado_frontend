import RegisterForm from '@/components/RegisterForm';
import React from 'react';
import Title from '@/components/title';

const Register = () => {
  return (
    <div>
      <Title/>
      <h1>Cadastre-se</h1>
      <RegisterForm/>
    </div>
  );
};

export default Register;
