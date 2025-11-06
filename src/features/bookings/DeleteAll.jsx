import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteAll } from "./useDeleteAll";
import { useNavigate } from "react-router-dom";
function DeleteAll() {
  const { deleteAll, isDeleting } = useDeleteAll();
  const navigate = useNavigate();
  return (
    <Modal>
      <Modal.Open opens="deleteAll">
        <Button variation="danger">DELETE ALL BOOKING </Button>
      </Modal.Open>
      <Modal.Window name="deleteAll">
        <ConfirmDelete
          resourceName="ALL BOOKING"
          disabled={isDeleting}
          onConfirm={() => {
            deleteAll();
            navigate("/dashboard", { replace: true });
          }}
        />
      </Modal.Window>
    </Modal>
  );
}

export default DeleteAll;
