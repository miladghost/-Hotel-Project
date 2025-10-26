import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export function useCheckin() {
  const navigate = useNavigate();
  //   const { bookingId: id } = useParams();
  const queryClient = useQueryClient();
  const {
    mutate: checkin,
    isPending: isCheckin,
    error,
  } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`booking #${data.id} successfully checked in`);
      queryClient.invalidateQueries({ active: true }); //{active:true} or ["booking", data.id]
      navigate("/");
    },
    onError: () => {
      toast.error("there was an error while checking in");
    },
  });
  return { checkin, isCheckin, error };
}
