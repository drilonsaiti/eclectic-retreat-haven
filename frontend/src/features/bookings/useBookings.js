import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getBookings} from "../../services/apiBookings.js";
import {useSearchParams} from "react-router-dom";
import {PAGE_SIZE} from "../../utils/helpers.js";

export function useBookings() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();

    const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

    const { isPending, data } = useQuery({
        queryKey: ['bookings', page],
        queryFn: () => getBookings({ page })
    });

    // Adjust the destructuring to handle the nested structure
    const bookings = data?.content;
    const totalElements = data?.totalElements;
    console.log("BOOKGINS ",bookings)
    const pageCount = Math.ceil(totalElements / PAGE_SIZE);

    if (page < pageCount)
        queryClient.prefetchQuery({
            queryKey: ["bookings", page + 1],
            queryFn: () => getBookings({  page: page + 1 }),
        });

    if (page > 1)
        queryClient.prefetchQuery({
            queryKey: ["bookings", page - 1],
            queryFn: () => getBookings({  page: page - 1 }),
        });


    return {isPending,bookings,totalElements}
}