import ButtonIcon from "../../ui/ButtonIcon.jsx";
import {HiArrowRightOnRectangle} from "react-icons/hi2";
import {useLogout} from "./useLogout.js";
import SpinnerMini from "../../ui/SpinnerMini.jsx";

const Logout = () => {

    const {logOut,isLoading} = useLogout();
    return (
        <ButtonIcon disabled={isLoading} onClick={logOut}>
            {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
        </ButtonIcon>
    );
};

export default Logout;