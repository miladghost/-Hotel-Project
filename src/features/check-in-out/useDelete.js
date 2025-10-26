import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBookingApi } from "../../services/apiBookings";

export function useDelete() {
  const queryClient = useQueryClient();
  const { mutate: deleteBooking, isPending: isDeletingBooking } = useMutation({
    mutationFn: (bookingId) => deleteBookingApi(bookingId),
    onSuccess: () => {
      toast.success(`successfully booking  deleted`);
      queryClient.invalidateQueries(["bookings"]);
    },
    onError: () => toast.error(`couldnt delete `),
  });
  return { deleteBooking, isDeletingBooking };
}
