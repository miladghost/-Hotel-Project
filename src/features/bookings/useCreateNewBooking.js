import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCreateNewBooking() {
  const queryClient = useQueryClient();
  const { mutate: addBooking, isPending: isAdding } = useMutation({
    mutationFn: (obj) => addBookingApi(obj),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings", "guests"] });
      toast.success(" added new booking succussfully");
    },
    onError: (err) => toast.error(err.message),
  });
  return { addBooking, isAdding };
}
