import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import CreateGuestForm from "./CreateGuestForm";
function AddGuest() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="guestForm">
          <Button>Add Guest</Button>
        </Modal.Open>
        <Modal.Window name="guestForm">
          <CreateGuestForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddGuest;
