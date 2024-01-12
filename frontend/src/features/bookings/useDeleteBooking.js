import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteAccommodation} from "../../services/apiAccommodations.js";
import toast from "react-hot-toast";
import {deleteBooking} from "../../services/apiBookings.js";

export function useDeleteBooking() {

    const queryClient = useQueryClient();

    const {isPending:isDeleting,mutate:deleteMutate} = useMutation({
        mutationFn:  deleteBooking,
        onSuccess: () => {
            toast.success("Booking successfully deleted")
            queryClient.invalidateQueries({
                queryKey: ['bookings'],
            })
        },
        onError: (error) => toast.error(error.message)
    })

    return {isDeleting,deleteMutate}
}