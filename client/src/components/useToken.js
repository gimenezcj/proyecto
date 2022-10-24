import { useState } from 'react';

export default function useToken() {

  const tokenString2=JSON.stringify({token:undefined});

  const getToken = () => {
    const tokenString = localStorage.getItem('token');

    if(tokenString!=='{}') {
      const userToken = JSON.parse(tokenString);
      return userToken?.token
    } else {
      const userToken = JSON.parse(tokenString2);
      return userToken?.token
    }
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    localStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
    token
  }
}