import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import StyledLogo from "../ui/common/Logo";
import { useOidc } from '@axa-fr/react-oidc'
import React from 'react'
import Button from "../ui/common/Button";
import Img from "../ui/common/Img";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Login() {

  const { login, logout, isAuthenticated } = useOidc()
  
  return (
    <LoginLayout>
      <StyledLogo>
        <span>Welcome to Eshop</span>
      </StyledLogo>
      <Img src="/open-identity.png" alt="Logo" />
      <LoginForm />
      {!isAuthenticated && <Button onClick={() => login('/home')}>Login</Button>}
      {isAuthenticated && <Button onClick={() => logout()}>Logout</Button>}

    </LoginLayout>
  );
}

export default Login;