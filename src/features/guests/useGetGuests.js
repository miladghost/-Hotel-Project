import { useQuery } from "@tanstack/react-query";
import { getGuestsApi } from "../../services/apiGuests";

export function useGetGuests() {
  const { data: guests, isLoading } = useQuery({
    queryKey: ["guests"],
    queryFn: getGuestsApi,
  });
  return { guests, isLoading };
}
