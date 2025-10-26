import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdate() {
  const queryClient = useQueryClient();
  const { mutate: updateCurrent, isPending: isUpdating } = useMutation({
    mutationFn: (data) => updateCurrentUser(data),
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      // queryClient.invalidateQueries({
      //   queryKey: ["user"],
      // });
      toast.success("successfully updated");
    },
    onError: (err) => toast.error(err.message),
  });
  return { updateCurrent, isUpdating };
}
