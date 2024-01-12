import {useQuery} from "@tanstack/react-query";
import {getAccommodations, getAccommodationsTypes} from "../../services/apiAccommodations.js";

export function useAccommodations() {
    const {isPending,data:accommodations} = useQuery({
        queryKey: ['accommodations'],
        queryFn: getAccommodations
    })

    return {isPending,accommodations}
}

export function useAccommodationsTypes(){
    const {data:typesOptions} = useQuery({
        queryKey: ['accommodationsTypes'],
        queryFn: getAccommodationsTypes
    })
    return {typesOptions};
}