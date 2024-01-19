import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import {useForm} from "react-hook-form";
import {useSignUp} from "./useSignUp.js";
import {useLogin} from "./useLogin.js";
import SpinnerMini from "../../ui/SpinnerMini.jsx";
import {useQueryClient} from "@tanstack/react-query";
import SignupForm from "./SignupForm.jsx";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {P} from "../../ui/Pagination.jsx";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    /*const {register,formState,getValues,reset,handleSubmit} = useForm();
    const {errors} = formState;*/
    const {login,isLoading,data} = useLogin();
    const queryClient = useQueryClient();
  function handleSubmit(e) {
      e.preventDefault();
      const data = {
          email: email,
          password: password
      }
      console.log(data);
        login(data,{
            onSettled:() => {
                setEmail('')
                setPassword('')
            }
        })

      console.log("DATA", queryClient.getQueriesData("user"));
  }
const navigate = useNavigate();
  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address" orientation="vertical" >
        <Input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          disabled={isLoading}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRow>
      <FormRow label="Password" orientation="vertical" >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isLoading}
          value={password}
          onChange={(e) => setPassword(e.target.value)}

        />
      </FormRow>
      <FormRow orientation="vertical">
        <Button disabled={isLoading} size="large">{!isLoading ? "Log in" : <SpinnerMini/>}</Button>
      </FormRow>
        <P style={{textAlign: "center",marginTop: "2rem"}}>No account? <Link style={{color: "var(--color-brand-600)",fontSize: "2rem"}} replace to="/signup">Sign up</Link></P>


    </Form>
  );
}

export default LoginForm;
