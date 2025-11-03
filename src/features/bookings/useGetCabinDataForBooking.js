import { useQuery } from "@tanstack/react-query";
import { getCabinDataForBooking } from "../../services/apiCabins";

export function useGetCabinDataForBooking(id) {
  const { data, isLoading } = useQuery({
    queryKey: ["cabinForBooking", id],
    queryFn: () => getCabinDataForBooking(id),
  });
  return { data, isLoading };
}
