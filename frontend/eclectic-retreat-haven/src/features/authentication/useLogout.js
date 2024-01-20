import {useNavigate} from "react-router-dom";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {logIn, logout} from "../../services/apiAuth.js";
import toast from "react-hot-toast";

export function useLogout(){
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {mutate:logOut,isLoading} = useMutation({
        mutationFn: logout,
        onSuccess: () => {

            toast.success("Account successfully log out.")
            navigate("/login",{replace: true})
        }
    })

    return {logOut,isLoading}
}