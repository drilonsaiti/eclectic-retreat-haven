import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateBooking} from "../../services/apiBookings.js";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";

export function useCheckin(){
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const {mutate:checkin,isLoading:isCheckingIn} = useMutation({
        mutationFn: ({ data, bookingId,pay }) => updateBooking({ data: { ...data,
                status:pay ? "checked-in" : "unconfirmed",
                paid: pay }}, bookingId ),
        onSuccess:(data) => {
            data.paid ?  toast.success(`Booking #${data.bookingId} successfully checked in`) :
                toast.success(`Booking #${data.bookingId} successfully updated`)
            queryClient.invalidateQueries({active:true})
            data.paid ? navigate("/") : '';
        },
        onError: () => toast.error("There was an error while checking in/updating")
    })

    return {checkin,isCheckingIn}

}