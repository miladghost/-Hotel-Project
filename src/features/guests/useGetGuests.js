import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getGuestsApi } from "../../services/apiGuests";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useGetGuests() {
  const [searchParam] = useSearchParams();
  const queryClient = useQueryClient();
  //pagination
  const currentPage = !searchParam.get("page")
    ? 1
    : Number(searchParam.get("page"));
  const { data: { data: guests, count } = {}, isLoading } = useQuery({
    queryKey: ["guests", currentPage],
    queryFn: () => getGuestsApi({ currentPage }),
  });
  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (currentPage < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["guests", currentPage + 1],
      queryFn: () => getGuestsApi({ currentPage: currentPage + 1 }),
    });
  }
  if (currentPage > 1) {
    queryClient.prefetchQuery({
      queryKey: ["guests", currentPage - 1],
      queryFn: () => getGuestsApi({ currentPage: currentPage - 1 }),
    });
  }

  return { guests, isLoading, count };
}
