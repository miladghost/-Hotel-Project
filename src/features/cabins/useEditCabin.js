import toast from "react-hot-toast";
import { editNewCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
export function useEditCabin() {
  const queryClient = useQueryClient();
  const { mutate: editCabin, isPending: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => editNewCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { editCabin, isEditing };
}
