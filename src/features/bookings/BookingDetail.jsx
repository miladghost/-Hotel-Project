import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useGetBookingDetail } from "./useGetBookingDetail";
import Spinner from "../../ui/Spinner";
import { HiArrowDownOnSquare } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import CheckoutButton from "../check-in-out/CheckoutButton";
import { useDelete } from "../check-in-out/useDelete";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, error, isLoading } = useGetBookingDetail();
  const { deleteBooking, isDeleteBooking } = useDelete();
  // const status = "checked-in";
  const navigate = useNavigate();
  const moveBack = useMoveBack();
  if (isLoading) return <Spinner />;
  if (error) throw new Error("coudnt get booking data ");
  const { id: bookingId, status } = booking;
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Modal>
        <Row type="horizontal">
          <HeadingGroup>
            <Heading as="h1">Booking #{bookingId}</Heading>
            <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
          </HeadingGroup>
          <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
        </Row>

        <BookingDataBox booking={booking} />

        <ButtonGroup>
          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>
          {status === "unconfirmed" && (
            <Button
              onClick={() => navigate(`/checkin/${bookingId}`)}
              icon={<HiArrowDownOnSquare />}
            >
              Checking in
            </Button>
          )}
          {status === "checked-in" && (
            <CheckoutButton bookingId={bookingId}>Check out</CheckoutButton>
          )}
          <Modal.Open opens="delete">
            <Button type="danger">delete</Button>
          </Modal.Open>
        </ButtonGroup>
        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName="booking"
            disabled={isDeleteBooking}
            onConfirm={() => {
              deleteBooking(bookingId, {
                onSettled: () => {
                  navigate(-1);
                },
              });
            }}
          />
        </Modal.Window>
      </Modal>
    </>
  );
}

export default BookingDetail;
