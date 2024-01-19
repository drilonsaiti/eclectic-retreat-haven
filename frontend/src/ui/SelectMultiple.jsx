import { useState } from 'react';
import styled from 'styled-components';
import { HiArrowDown} from 'react-icons/hi2';
import {useSearchParams} from "react-router-dom";
import Input from "./Input.jsx";
import {useOutsideClick} from "../hooks/useOutsideClick.js";

const StyledDropdown = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    font-size: 1.4rem;
    padding: 1.1rem 1.3rem;
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

const DropdownResetButton = styled.button`
    font-size: 1.4rem;
    padding: 0.6rem 0.9rem;
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

const DropdownContent = styled.div`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  position: absolute;
  background-color: var(--color-grey-50);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  min-width: 160px;
  padding: 12px;
`;

const FieldParagraph = styled.p`
  font-weight: bold;
`;

const CheckboxLabel = styled.label`
  display: flex;
    align-items: center;
    gap: 1rem;
  margin-bottom: 8px;
`;

const SelectMultiple = ({ options }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchParams,setSearchParams] = useSearchParams();
    const [selectedOptions, setSelectedOptions] = useState({});
    const dropdownRef = useOutsideClick(() => setIsOpen(false));
    const handleClick = (field, value) => {
        const newSearchParams = new URLSearchParams(searchParams);
        if (selectedOptions[field] === value) {

            newSearchParams.delete(field);
            setSelectedOptions((prevSelectedOptions) => {
                const updatedOptions = { ...prevSelectedOptions };
                delete updatedOptions[field];
                return updatedOptions;
            });
        } else {

            newSearchParams.set(field, value);
            setSelectedOptions({ ...selectedOptions, [field]: value });
        }

        setSearchParams(newSearchParams);
    };

    const resetFilter = ()=>{
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.delete("discount");
        newSearchParams.delete("status");

        setSearchParams(newSearchParams);
        setSelectedOptions({});
    }


    return (
        <StyledDropdown ref={dropdownRef}>
            <DropdownButton onClick={() => setIsOpen(!isOpen)}>Filter <HiArrowDown/> </DropdownButton>
            <DropdownContent isOpen={isOpen}>
                {Object.keys(options).map((field) => (
                    <div key={field}>
                        <FieldParagraph>{options[field].field}</FieldParagraph>
                        {options[field].optionsFiled.map((option) => (
                            <CheckboxLabel key={option.value || option}>
                                <Input
                                    type="checkbox"
                                    checked={selectedOptions[field] === option.value}
                                    onChange={() => handleClick(field, option.value)}
                                />
                                {option.label || option}
                            </CheckboxLabel>
                        ))}
                    </div>
                ))}
                <DropdownResetButton onClick={resetFilter}>Reset filter</DropdownResetButton>

            </DropdownContent>
        </StyledDropdown>
    );
};

export default SelectMultiple;
