import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useGetBookings() {
  const [searchParam] = useSearchParams();
  const queryClient = useQueryClient();
  //Filter
  const filterValue = searchParam.get("status");
  const filterObj =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // : [
  //     { field: "totalPrice", value: 7000, method: "gte" },
  //     { field: "status", value: filterValue },
  //   ]; its for multi filtering

  //Sort
  const sortByRaw = searchParam.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortByObj = { field, direction };
  //PAGINATION
  const currentPage = !searchParam.get("page")
    ? 1
    : Number(searchParam.get("page"));

  const {
    data: { data: bookings, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", filterObj, sortByObj, currentPage],
    queryFn: () => getBookings({ filterObj, sortByObj, currentPage }),
  });
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (currentPage < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterObj, sortByObj, currentPage + 1],
      queryFn: () =>
        getBookings({ filterObj, sortByObj, currentPage: currentPage + 1 }),
    });
  }
  if (currentPage > 1) {
    queryClient.prefetchQuery({
      queryKey: ["bookings", filterObj, sortByObj, currentPage - 1],
      queryFn: () =>
        getBookings({ filterObj, sortByObj, currentPage: currentPage - 1 }),
    });
  }
  return { bookings, isLoading, error, count };
}
