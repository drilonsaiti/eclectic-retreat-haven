import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteAccommodation} from "../../services/apiAccommodations.js";
import toast from "react-hot-toast";

export function useDeleteAccommodation() {

    const queryClient = useQueryClient();

    const {isPending:isDeleting,mutate:deleteMutate} = useMutation({
        mutationFn:  deleteAccommodation,
        onSuccess: () => {
            toast.success("Accommodation successfully deleted")
            queryClient.invalidateQueries({
                queryKey: ['accommodations'],
            })
        },
        onError: (error) => toast.error(error.message)
    })

    return {isDeleting,deleteMutate}
}