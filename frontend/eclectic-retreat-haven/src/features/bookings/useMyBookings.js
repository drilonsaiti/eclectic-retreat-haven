import {useQuery, useQueryClient} from "@tanstack/react-query";
import {useSearchParams} from "react-router-dom";
import {getBookings, getMyBookings} from "../../services/apiBookings.js";
import {PAGE_SIZE} from "../../utils/helpers.js";

export function useMyBookings() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();

    const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));
    const types = searchParams.get('types') || '';
    const status = searchParams.get('status') || '';
    const sort = searchParams.get("sortBy") || "";

    const { isPending, data } = useQuery({
        queryKey: ['myBookings',types,status,sort, page],
        queryFn: () => getMyBookings({ page,types,status,sort })
    });

    const bookings = data?.content;
    const totalElements = data?.totalElements;

    const pageCount = Math.ceil(totalElements / PAGE_SIZE);

    if (page < pageCount)
        queryClient.prefetchQuery({
            queryKey: ["myBookings",types,status,sort, page + 1],
            queryFn: () => getMyBookings({  page: page + 1,types,status,sort }),
        });

    if (page > 1)
        queryClient.prefetchQuery({
            queryKey: ["myBookings",types,status,sort, page - 1],
            queryFn: () => getMyBookings({  page: page - 1,types,status,sort }),
        });


    return {isPending,bookings,totalElements}
}
