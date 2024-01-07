import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createEditAccommodation} from "../../services/apiAccommodations.js";
import toast from "react-hot-toast";


export function useCreateAccommodation() {
    const queryClient = useQueryClient();

    const {mutate:createAccommodation,isPending:isCreating} = useMutation({
        mutationFn: createEditAccommodation,
        onSuccess: () => {
            toast.success("New accommodation successfully created");
            queryClient.invalidateQueries({
                queryKey: ['accommodations'],
            });
        },
        onError:(err) => toast.error(err.message)
    });

    return {isCreating,createAccommodation}
}
