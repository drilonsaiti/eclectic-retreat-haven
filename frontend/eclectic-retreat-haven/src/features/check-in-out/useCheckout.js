import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateBooking} from "../../services/apiBookings.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

export function useCheckout(){
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {mutate,isLoading:isCheckingOut} = useMutation({
        mutationFn: ( bookingId ) => updateBooking({ data: { status: "checked-out" }}, bookingId ),
        onSuccess:(bookingId) => {
            console.log("BOOKING DATA IN CHECKOUT " ,bookingId)
            toast.success(`Booking #${bookingId.bookingId} successfully checked out`)
            queryClient.invalidateQueries({active:true})

    },
        onError: () => toast.error("There was an error while checking out")
    })

    return {mutate,isCheckingOut}

}