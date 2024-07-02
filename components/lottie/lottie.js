import React from 'react';
import Lottie from 'react-lottie-player';
import animationData from '@/public/Animation.json'; // Caminho para o seu arquivo JSON

const LottieAnimation = () => {
  return (
    <Lottie
      loop
      animationData={animationData}
      play
      style={{ width: 300, height: 300 }}
    />
  );
};

export default LottieAnimation;
