import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;

  ${(props) =>
      props.type === 'horizontal' &&
      css`
        justify-content: space-between;
        align-items: center;

        @media screen and (max-width: 84em) {
          ${(props.change === 'yes') &&
          css`
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start; 
            gap: 1.6rem;
            margin-bottom: 1rem;
          `
          }
        }
      `}

  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

Row.defaultProps = {
  type: "vertical",
};

export default Row;
