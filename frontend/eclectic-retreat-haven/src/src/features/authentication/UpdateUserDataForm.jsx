import {useState} from "react";
import FormRow from "../../ui/FormRow.jsx";
import Input from "../../ui/Input.jsx";
import FileInput from "../../ui/FileInput.jsx";
import Button from "../../ui/Button.jsx";
import {useProfile, useUpdateAvatar, useUpdateUser} from "./useUpdateUser.js";
import Form from "../../ui/Form.jsx";
import Spinner from "../../ui/Spinner.jsx";


function UpdateUserDataForm() {

    const {profileData,isLoading} = useProfile();
    const {updateUser,isUpdating} = useUpdateUser();
    const {updateAvatar,isUpdatingAvatar} = useUpdateAvatar();
    const [fullName, setFullName] = useState(profileData?.fullName);
    const [password, setPassword] = useState(null);
    const [avatar, setAvatar] = useState(null);

    if (isLoading) return <Spinner/>

/*  const { mutate: updateUser, isLoading: isUpdating } = useUpdateUser();*/

  function handleSubmit(e) {
    e.preventDefault();
    updateUser({fullName,password},
        {
            onSuccess: () => {
                e.target.reset();
            }
        })
  }
    function handleFileChange(e) {
        const selectedFile = e.target.files[0];
        setAvatar(selectedFile);

        // Call the function to handle avatar submission
        handleSubmitAvatar(e, selectedFile);
    }
  function handleSubmitAvatar(e,value){


      const data = {
          'avatar': value,
          'user': profileData?.email
      }
      updateAvatar(data,{
          onSuccess: () => {
              setAvatar('');
          }
      })
  }

  function handleCancel(e) {
    setFullName(profileData.fullName);
    setAvatar(null);
  }

  return (
      <>
          <Form>
              <FormRow label='Avatar image'>
                  <FileInput

                      id='avatar'
                      accept='image/*'
                        disabled={isUpdatingAvatar}
                      onChange={handleFileChange}
                  />
              </FormRow>

          </Form>
    <Form onSubmit={handleSubmit}>
      <FormRow label='Email address'>
        <Input  disabled value={profileData?.email}/>
      </FormRow>
      <FormRow label='Full name'>
        <Input
          type='text'
            value={fullName || profileData?.fullName}
          disabled={isUpdating}
          onChange={(e) => setFullName(e.target.value)}
          id='fullName'
        />
      </FormRow>

        <FormRow label="Password" >
            <Input
                type="password"
                id="password"
                autoComplete="current-password"
                disabled={isUpdating}
                value={password}
                onChange={(e) => setPassword(e.target.value)}

            />

        </FormRow>
        <FormRow>
            <Button onClick={handleCancel} type='reset' variation='secondary'>
                Cancel
            </Button>
            <Button disabled={isUpdating || !password}>Update account</Button>
        </FormRow>

    </Form>

          </>
  );
}

export default UpdateUserDataForm;
