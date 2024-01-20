import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {updateSetting} from "../../services/apiSettings.js";

export function useUpdateSettings() {
    const queryClient = useQueryClient();

    const {mutate:updatedSettings,isPending: isUpdating} = useMutation({
        mutationFn:updateSetting,
        onSuccess: () => {
            toast.success("Settings successfully updated");
            queryClient.invalidateQueries({
                queryKey: ['settings'],
            });
        },
        onError:(err) => toast.error(err.message)
    });

    return {isUpdating,updatedSettings}
}