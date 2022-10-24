import React from "react";
import { Navigate } from "react-router-dom";
import useToken from '../components/useToken';

const Logout= () => {
  const { token, setToken } = useToken();

  setToken("{'token':''}");

  return (
    <>
      <Navigate replace to="/" />
    </>
  );
}

export default Logout;