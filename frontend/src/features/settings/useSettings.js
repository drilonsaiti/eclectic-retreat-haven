import {QueryClient, useQuery} from "@tanstack/react-query";
import {getSettings} from "../../services/apiSettings.js";

export function useSettings() {
    const queryClient = new QueryClient();

    const{isPending,error,data:settings} = useQuery({
        queryKey: ['settings'],
        queryFn:getSettings
    })

    return {isPending,error,settings};
}