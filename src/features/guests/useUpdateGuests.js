import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateGusetApi } from "../../services/apiGuests";

export function useUpdateGuests() {
  const queryClient = useQueryClient();
  const { mutate: editGuest, isPending: isEditing } = useMutation({
    mutationFn: ({ newGuest, id }) => updateGusetApi({ newGuest, id }),
    onSuccess: () => {
      toast.success("successfully edited ");
      queryClient.invalidateQueries({ queryKey: ["guests"] });
    },
    onError: () => toast.error("edit guest failed"),
  });
  return { editGuest, isEditing };
}
