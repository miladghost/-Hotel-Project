import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getGuestsApi } from "../../services/apiGuests";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";
import { useMemo } from "react";
import supabase from "../../services/supabase";

export function useGetGuests() {
  const [searchParam] = useSearchParams();
  const queryClient = useQueryClient();
  //pagination
  const currentPage = !searchParam.get("page")
    ? 1
    : Number(searchParam.get("page"));
  //search filter
  const search = searchParam.get("search") || "";
  //sort
  const rawSort = searchParam.get("sortBy") || "fullName-asc";
  const [field, direction] = rawSort.split("-");
  const rawSortObj = useMemo(() => ({ field, direction }), [field, direction]);
  const objStr = JSON.stringify(rawSortObj);
  const { data: { data: guests, count } = {}, isLoading } = useQuery({
    queryKey: ["guests", currentPage, search, objStr],
    queryFn: () => getGuestsApi({ currentPage, search, rawSortObj }),
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (currentPage < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["guests", currentPage + 1, search, objStr],
      queryFn: () =>
        getGuestsApi({ currentPage: currentPage + 1, search, rawSortObj }),
    });
  }
  if (currentPage > 1) {
    queryClient.prefetchQuery({
      queryKey: ["guests", currentPage - 1, search, objStr],
      queryFn: () =>
        getGuestsApi({ currentPage: currentPage - 1, search, rawSortObj }),
    });
  }

  return { guests, isLoading, count };
}
