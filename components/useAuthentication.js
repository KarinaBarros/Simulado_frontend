import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import getConfig from 'next/config';

const useAuthentication = () => {
  const { publicRuntimeConfig } = getConfig();
  const router = useRouter();

  useEffect(() => {
   const checkOut = async () => {
    try{
      await axios.get (`${publicRuntimeConfig.serverUrl}/protected`, {withCredentials: true});
    } catch (err) {
      router.push('/login');
    }
   };
   checkOut();
  }, []);
};

export default useAuthentication;

