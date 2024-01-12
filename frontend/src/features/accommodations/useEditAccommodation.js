import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createEditAccommodation} from "../../services/apiAccommodations.js";
import toast from "react-hot-toast";

export function useEditAccommodation() {
    const queryClient = useQueryClient();

    const {mutate:editAccommodation,isPending: isEditing} = useMutation({
        mutationFn:({newData, id}) => createEditAccommodation(newData,id),
        onSuccess: () => {
            toast.success("Accommodation successfully edited");
            queryClient.invalidateQueries({
                queryKey: ['accommodations'],
            });
        },
        onError:(err) => toast.error(err.message)
    });

    return {isEditing,editAccommodation}
}