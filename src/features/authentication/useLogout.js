import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logOutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logOut, isPending } = useMutation({
    mutationFn: logOutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
    onError: (err) => {
      throw new Error(err.message);
    },
  });
  return { logOut, isPending };
}
