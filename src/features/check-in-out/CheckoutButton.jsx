import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckOut } = useCheckout();
  function handleCheckOut() {
    checkout(bookingId);
  }
  return (
    <Button
      disabled={isCheckOut}
      onClick={handleCheckOut}
      variation="primary"
      size="small"
    >
      CHECK OUT
    </Button>
  );
}

export default CheckoutButton;
