import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";
import { subDays } from "date-fns";
export function useRecentBookings() {
  const [searchParam] = useSearchParams();
  const curFilterLast = !searchParam.get("last")
    ? 7
    : Number(searchParam.get("last"));
  const lastToDateConv = subDays(new Date(), curFilterLast).toISOString();
  const { isLoading, data: recentBookings } = useQuery({
    queryKey: ["recentBookings", curFilterLast],
    queryFn: () => getBookingsAfterDate(lastToDateConv),
  });
  return { isLoading, recentBookings };
}
