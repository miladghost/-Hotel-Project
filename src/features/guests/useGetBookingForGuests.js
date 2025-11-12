import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";

export function useGetBookingForGuests() {
  const { data, isLoading } = useQuery({
    queryFn: getBookings,
    queryKey: ["bookings-for-guests"],
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });

  return { bookingForGuest: data?.data || [], isLoading };
}
