import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateNewBookingForm from "./CreateNewBookingForm";

function AddBooking() {
  return (
    <Modal>
      <Modal.Open opens="addBooking">
        <Button>Add new Booking</Button>
      </Modal.Open>
      <Modal.Window name="addBooking">
        <CreateNewBookingForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddBooking;
