import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { isPending: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("sucsessFully updated");
      queryClient.invalidateQueries(["settings"]);
    },
    onError: () => toast.error("updating failed!"),
  });
  return { isUpdating, updateSetting };
}
