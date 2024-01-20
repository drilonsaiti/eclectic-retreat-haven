import {useQuery} from "@tanstack/react-query";
import {getBookedDates} from "../../services/apiBookings.js";


export function useBookedDates(accmId){
    console.log("DATES ACCM ID",accmId);
    const {isLoading,data:dataDates} = useQuery({
        queryFn: () => getBookedDates(accmId),
        queryKey:  ["bookingDates", accmId],
    })

    return {isLoading,dataDates};
}