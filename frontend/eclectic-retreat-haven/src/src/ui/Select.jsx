import styled from "styled-components";
import {forwardRef} from "react";
import {useFormatString} from "../features/accommodations/useFormatString.js";

export const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;


// eslint-disable-next-line react/display-name
const Select = forwardRef(({ options, value, ...props }, ref) => {

    let str = useFormatString(value+'');
    const isTypes = Array.isArray(options) && options.length > 0 ? options[0]?.value : null;


    return (
        <StyledSelect ref={ref}  {...props} value={isTypes ? value : str} >
            {options?.map((option) => (
                <option key={option.value || option} value={option.value || option}>
                    {option.label || option}
                </option>
            ))}
        </StyledSelect>
    );
});
export default Select;

