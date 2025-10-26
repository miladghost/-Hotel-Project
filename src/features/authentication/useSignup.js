import { useMutation } from "@tanstack/react-query";
import { signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
export function useSignup() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: (data) => signupApi(data),
    onSuccess: (user) => {
      console.log(user);
      toast.success(`successfully signed up `);
      //${user.data.user.user_metadata.fullName}
    },
    onError: () => {
      toast.error("there is A Problem in signup");
    },
  });
  return { signup, isPending };
}
