import {useMutation, useQuery} from "@tanstack/react-query";
import {getRoles, signUp} from "./apiAuth.js";
import toast from "react-hot-toast";

export function useGetRole(){
    const {data:roles,isLoading} = useQuery({
        queryFn: getRoles,
        queryKey: ["roles"]
    })

    return {roles,isLoading}
}