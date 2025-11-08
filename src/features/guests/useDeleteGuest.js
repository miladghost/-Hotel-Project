import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteGuestApi } from "../../services/apiGuests";

export function useDeleteGuest() {
  const queryClient = useQueryClient();
  const { mutate: remove, isPending: isDeleting } = useMutation({
    mutationFn: (id) => deleteGuestApi(id),
    onSuccess: () => {
      toast.success("removed successfully");
      queryClient.invalidateQueries({ queryKey: ["guests"] });
    },
    onError: () =>
      toast.error("This guest has existing bookings and cannot be deleted."),
  });
  return { remove, isDeleting };
}
