import {useForm} from "react-hook-form";
import {useUpdatePassword, useUpdateUser} from "./useUpdateUser.js";
import Form from "../../ui/Form.jsx";
import FormRow from "../../ui/FormRow.jsx";
import Input from "../../ui/Input.jsx";
import Button from "../../ui/Button.jsx";


function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { update, isLoading: isUpdating } = useUpdatePassword();

  function onSubmit({ oldPassword,password,passwordConfirm }) {
      const data = {
          oldPassword: oldPassword,
          password: password,
          confirmPassword: passwordConfirm
      }
      update(data, { onSuccess: () => reset() });
  }

  function handleReset(e) {
    // e.preventDefault();
    reset();
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow
            label='Old password '
            error={errors?.password?.message}
        >
            <Input
                type='password'
                id='oldPasswordd'
                disabled={isUpdating}
                {...register('oldPassword', {
                    required: 'This field is required',
                })}
            />
        </FormRow>
      <FormRow
        label='Password (min 8 characters)'
        error={errors?.password?.message}
      >
        <Input
          type='password'
          id='password'
          // this makes the form better for password managers
          autoComplete='current-password'
          disabled={isUpdating}
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password needs a minimum of 8 characters',
            },
          })}
        />
      </FormRow>

      <FormRow
        label='Confirm password'
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type='password'
          autoComplete='new-password'
          id='passwordConfirm'
          disabled={isUpdating}
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: (value) =>
              getValues().password === value || 'Passwords need to match',
          })}
        />
      </FormRow>
      <FormRow>
        <Button onClick={handleReset} type='reset' variation='secondary'>
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update password</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
