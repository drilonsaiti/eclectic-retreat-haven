import styled from "styled-components";

import { useMoveBack } from "../hooks/useMoveBack";
import Heading from "../ui/Heading";
import Button from "../ui/Button.jsx";
import {HiChevronLeft} from "react-icons/hi2";

const StyledPageNotFound = styled.main`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

export const Box = styled.div`
  /* box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 3.2rem;
  }
`;

function AccessDenied() {
    const moveBack = useMoveBack();

    return (
        <StyledPageNotFound>
            <Box>
                <Heading as="h2" style={{marginBottom: '2rem'}}>
                    Access Denied. You dont have the required permissions. 😢❌
                </Heading>
                <Button  notFound={"notFound"} onClick={moveBack} size="large">
                    <HiChevronLeft /> Go back
                </Button>
            </Box>
        </StyledPageNotFound>
    );
}

export default AccessDenied;
