import React from "react";
import styled from "styled-components";

import Logo from "../../commonComponents/Logo";
import SignupForm from "./SignupForm";

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: ${props => `${props.theme.brand}33`};
  @media (min-width: 576px) {
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Container = styled.div`
  width: 100%;
  @media (min-width: 576px) {
    padding: 2rem;
    max-width: 480px;
  }
`;

const Header = styled.div`
  background-color: #fff;
  padding: 2rem;
  @media (min-width: 576px) {
    background-color: initial;
  }
`;

const AuthWrapper = styled.div`
  background-color: #fff;
  padding: 2rem 2rem 2rem;
`;

function Signup() {
  return (
    <Wrapper>
      <Container>
        <Header>
          <Logo />
        </Header>
        <AuthWrapper>
          <SignupForm />
        </AuthWrapper>
      </Container>
    </Wrapper>
  );
}

export default Signup;
