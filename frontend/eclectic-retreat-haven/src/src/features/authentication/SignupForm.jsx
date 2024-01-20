import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import {useForm} from "react-hook-form";
import {useSignUp} from "./useSignUp.js";
import {P} from "../../ui/Pagination.jsx";
import {Link} from "react-router-dom";

// Email regex: /\S+@\S+\.\S+/

function SignupForm({type}) {
    const {register,formState,getValues,reset,handleSubmit} = useForm();
    const {errors} = formState;
    const {signup,isLoading} = useSignUp();

    const onSubmit = (data) =>{
        signup(data,{
            onSettled:() => reset()
        });
    }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input type="text" id="fullName"
               disabled={isLoading}
               {...register("fullName", {required:"This field is required"})}/>
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input type="email" id="email"
               disabled={isLoading}

               {...register("email", {required:"This field is required",
               pattern: {
                   value: /\S+@\S+\.\S+/,
                   message: "Please provide a valid email address"
               }})}/>
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
        <Input type="password" id="password"
               disabled={isLoading}

               {...register("password", {required:"This field is required",
               minLength: {
                   value: 8,
                   message: "Password need a minimum of 8 characters"
               }})}/>
      </FormRow>

      <FormRow label="Repeat password" error={errors?.repeatPassword?.message}>
        <Input type="password" id="repeatPassword"
               disabled={isLoading}

               {...register("repeatPassword", {required:"This field is required",
               validate:(value) => value === getValues().password || "Password need to match" })}/>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
          { (type !== "signup") && <Button  disabled={isLoading}
                               variation="secondary" type="reset">
          Cancel
        </Button>
          }
        <Button disabled={isLoading}
        >{type === "signup" ? 'Creat account' : 'Create new user'}</Button>
      </FormRow>
        <P style={{textAlign: "center",marginTop: "2rem"}}>Already have an account? <Link style={{color: "var(--color-brand-600)",fontSize: "2rem"}} replace to="/login">Log in</Link></P>

    </Form>
  );
}

export default SignupForm;
