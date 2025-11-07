import Modal from "../../ui/Modal";
import Button from "../../Button";
import CreateGuestForm from "./CreateGuestForm";
function AddGuest() {
  return (
    <Modal>
      <Modal.Open>
        <Button>Add Guest</Button>
      </Modal.Open>
      <Modal.Window>
        <CreateGuestForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddGuest;
