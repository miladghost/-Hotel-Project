import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createNewGuestApi } from "../../services/apiGuests";
export function useCreateNewGuest() {
  const queryClient = useQueryClient();
  const { mutate: addGuest, isPending: isAdding } = useMutation({
    mutationFn: (data) => createNewGuestApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["guests"] });
      toast.success("New Guest Added successfully");
    },
    onError: () => toast.error("adding Guest Failed"),
  });
  return { addGuest, isAdding };
}
