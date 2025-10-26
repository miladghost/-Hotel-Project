import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivity() {
  const { isLoading, data: activityData } = useQuery({
    queryKey: ["todayActivity"],
    queryFn: getStaysTodayActivity,
  });
  return { isLoading, activityData };
}
