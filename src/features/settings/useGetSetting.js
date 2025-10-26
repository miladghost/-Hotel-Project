import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useGetSetting() {
  const {
    data: settingData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
  if (error) throw new Error("couldnt fetch any Settings Data");
  return { settingData, isLoading };
}
