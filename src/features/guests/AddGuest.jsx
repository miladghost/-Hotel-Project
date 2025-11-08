import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import CreateGuestForm from "./CreateGuestForm";
function AddGuest() {
  return (
    <Modal>
      <Modal.Open opens="guestForm">
        <Button>Add Guest</Button>
      </Modal.Open>
      <Modal.Window name="guestForm">
        <CreateGuestForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddGuest;
