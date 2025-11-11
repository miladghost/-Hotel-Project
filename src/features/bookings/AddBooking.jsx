import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
function AddBooking() {
  const navigate = useNavigate();
  return (
    <div>
      <Button onClick={() => navigate("/addBooking")}>Add new Booking</Button>
    </div>
  );
}

export default AddBooking;
