import {useMutation, useQuery} from "@tanstack/react-query";
import {signUp} from "../../services/apiAuth.js";
import toast from "react-hot-toast";


export function useSignUp(){
    const {mutate:signup,isLoading} = useMutation({
        mutationFn: signUp,
        onSuccess: () => toast.success("Account successfully created! Please verify the new account from the email address.")
    })

    return {signup,isLoading}
}