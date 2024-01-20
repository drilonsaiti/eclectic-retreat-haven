import styled from "styled-components";
import ButtonIcon from "./ButtonIcon.jsx";
import {HiArrowRightOnRectangle, HiOutlineUser} from 'react-icons/hi2';
import {useNavigate} from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle.jsx";
import Logout from "../features/authentication/Logout.jsx";

const StyledHeaderMenu = styled.ul`
    display: flex;
    gap: 0.4rem;
`;

const HeaderMenu = () => {
    const navigate = useNavigate();
    return (
        <StyledHeaderMenu>
            <li>
                <ButtonIcon onClick={() => navigate("/account")}>
                    <HiOutlineUser/>
                </ButtonIcon>
            </li>
            <li>
                <DarkModeToggle />

            </li>
            <li>
                <Logout />
            </li>
        </StyledHeaderMenu>
    );
};

export default HeaderMenu;