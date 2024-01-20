import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createEditAccommodation} from "../../services/apiAccommodations.js";
import toast from "react-hot-toast";
import {profile, updateCurrentAvatar, updateCurrentFullName, updatePassword} from "../../services/apiAuth.js";


export function useProfile(){
    const {data:profileData,isLoading} = useQuery({
        queryFn:profile,
        queryKey: ['profile']
    })

    return {profileData,isLoading}
}

export function useUpdateUser() {
    const queryClient = useQueryClient();

    const {mutate:updateUser,isPending: isUpdating} = useMutation({
        mutationFn:updateCurrentFullName,
        onSuccess: () => {
            toast.success("User account successfully updated");
            queryClient.invalidateQueries({
                queryKey: ['user'],
            });
        },
        onError:(err) => toast.error(err.message)
    });

    return {updateUser,isUpdating}
}

export function useUpdateAvatar() {
    const queryClient = useQueryClient();

    const {mutate:updateAvatar,isPending: isUpdatingAvatar} = useMutation({
        mutationFn:updateCurrentAvatar,
        onSuccess: () => {
            toast.success("User account avatar successfully updated");
            queryClient.invalidateQueries({
                queryKey: ['user'],
            });
        },
        onError:(err) => toast.error(err.message)
    });

    return {updateAvatar,isUpdatingAvatar}
}

export function useUpdatePassword() {
    const queryClient = useQueryClient();

    const {mutate: update, isPending: isUpdating} = useMutation({
        mutationFn: updatePassword,
        onSuccess: () => {
            toast.success("User account password successfully updated");
            queryClient.invalidateQueries({
                queryKey: ['user'],
            });
        },
        onError: (err) => toast.error(err.message)
    });

    return {update, isUpdating}
}
