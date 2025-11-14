import { useQuery } from "@tanstack/react-query";
import { getAllGuestsApi } from "../../services/apiGuests";

export function useGetAllGuests() {
  const { data: allGuests, isLoading } = useQuery({
    queryFn: getAllGuestsApi,
    queryKey: ["guests"],
  });
  return { allGuests, isLoading };
}
