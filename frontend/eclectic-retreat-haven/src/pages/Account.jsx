import Heading from "../ui/Heading.jsx";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm.jsx";
import Row from "../ui/Row.jsx";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm.jsx";


function Account() {
  return (
    <>
      <Heading as="h1">Update your account</Heading>

      <Row>
        <Heading as="h3">Update user data</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row style={{marginTop: '2rem'}}>
        <Heading as="h3">Update password</Heading>
        <UpdatePasswordForm/>
      </Row>
    </>
  );
}

export default Account;
