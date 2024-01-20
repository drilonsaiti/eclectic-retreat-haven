import styled from "styled-components";
import LoginForm from "../features/authentication/LoginForm.jsx";
import Logo from "../ui/Logo.jsx";
import Heading from "../ui/Heading.jsx";
import SignupForm from "../features/authentication/SignupForm.jsx";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 58rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50);
`;

function Signup() {
    return <LoginLayout>
        <Logo />
        <Heading type="login">Create a new account</Heading>
        <SignupForm type="signup"/>
    </LoginLayout>;
}

export default Signup;
