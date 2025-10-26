import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";
export function useRecentStays() {
  const [searchParam] = useSearchParams();
  const numDays = !searchParam.get("last")
    ? 7
    : Number(searchParam.get("last"));
  const lastToDateConv = subDays(new Date(), numDays).toISOString();
  const { isLoading, data: recentStays } = useQuery({
    queryKey: ["recentStays", numDays],
    queryFn: () => getStaysAfterDate(lastToDateConv),
  });
  const confirmedStays = recentStays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );
  return { isLoading, recentStays, confirmedStays, numDays };
}
