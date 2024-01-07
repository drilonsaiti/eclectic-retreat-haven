import styled from "styled-components";

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);

    &:checked {
        /* Your styles for checked state go here */
        /*filter: invert(100%) hue-rotate(18deg) brightness(1.7);*/
         accent-color: var(--color-brand-700); 
    }
`;

export default Input;
