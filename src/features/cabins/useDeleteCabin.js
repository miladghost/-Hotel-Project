import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteApi } from "../../services/apiCabins";
import toast from "react-hot-toast";
export function useDeleteCabin() {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
    mutationFn: deleteApi, //(id) => deleteCabin(id),
    onSuccess: () => {
      toast.success("sucsessfully deleted ");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isDeleting, deleteCabin };
}
