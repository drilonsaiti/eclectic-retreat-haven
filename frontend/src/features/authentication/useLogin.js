import {useMutation, useQueryClient} from "@tanstack/react-query";
import {logIn} from "../../services/apiAuth.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

export function useLogin(){
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {mutate:login,isLoading} = useMutation({
        mutationFn: logIn,
        onSuccess: (data) => {
            queryClient.setQueriesData(["user"],data)
            toast.success("Account successfully log in.")
            navigate("/")
        },
        onError: error => toast.error(error.message)
    })

    return {login,isLoading}
}