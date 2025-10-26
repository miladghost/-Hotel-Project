import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isPending: isLogin } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      console.log(user);
      toast.success("loged in successfully");
      queryClient.setQueryData(["user"], user.data.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => toast.error(err.message),
  });
  return { login, isLogin };
}
