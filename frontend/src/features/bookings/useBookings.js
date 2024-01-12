import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {getBooking, getBookings} from "../../services/apiBookings.js";
import {useSearchParams} from "react-router-dom";
import {PAGE_SIZE} from "../../utils/helpers.js";
import {createEditAccommodation} from "../../services/apiAccommodations.js";
import toast from "react-hot-toast";

export function useBookings() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();

    const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
    const types = searchParams.get('types') || '';
    const status = searchParams.get('status') || '';
    const sort = searchParams.get("sortBy") || "";

    const { isPending, data } = useQuery({
        queryKey: ['bookings',types,status,sort, page],
        queryFn: () => getBookings({ page,types,status,sort })
    });

    const bookings = data?.content;
    const totalElements = data?.totalElements;

    const pageCount = Math.ceil(totalElements / PAGE_SIZE);

    if (page < pageCount)
        queryClient.prefetchQuery({
            queryKey: ["bookings",types,status,sort, page + 1],
            queryFn: () => getBookings({  page: page + 1,types,status,sort }),
        });

    if (page > 1)
        queryClient.prefetchQuery({
            queryKey: ["bookings",types,status,sort, page - 1],
            queryFn: () => getBookings({  page: page - 1,types,status,sort }),
        });


    return {isPending,bookings,totalElements}
}
