import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm";
import StyledLogo from "../ui/common/Logo";
import Heading from "../ui/common/Heading";
import { useOidc, useOidcIdToken } from '@axa-fr/react-oidc'
import React from 'react'
import Button from "../ui/common/Button";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const { login, logout, isAuthenticated } = useOidc()
  const { idToken, idTokenPayload } = useOidcIdToken();

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