import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteAllBooking } from "../../services/apiBookings";

export function useDeleteAll() {
  const queryClient = useQueryClient();
  const { mutate: deleteAll, isPending: isDeleting } = useMutation({
    mutationFn: () => deleteAllBooking(),
    onSuccess: () => {
      toast.success("successfully deleted All bookings");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: () => toast.error("deleting failed"),
  });
  return { deleteAll, isDeleting };
}
