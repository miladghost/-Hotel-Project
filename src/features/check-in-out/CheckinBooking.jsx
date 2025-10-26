import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useGetBookingDetail } from "../bookings/useGetBookingDetail";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useCheckin } from "./useCheckin";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useGetSetting } from "../settings/useGetSetting";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
  margin-top: 8px;
`;

function CheckinBooking() {
  const [paidConfirmed, setPaidConfirmed] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const { booking, isLoading, error } = useGetBookingDetail();
  const { settingData, isLoading: isLoadingSetting } = useGetSetting();

  const { checkin, isCheckin } = useCheckin();
  const moveBack = useMoveBack();
  useEffect(() => setPaidConfirmed(booking?.isPaid || false), [booking]);

  if (isLoading || isLoadingSetting) return <Spinner />;
  if (error) throw new Error("couldnt get booking data ");
  const { breakfastPrice } = settingData;
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;
  const totalPriceWithBreakfast = breakfastPrice * numGuests * numNights;
  function handleCheckin() {
    if (!paidConfirmed) return;
    if (addBreakfast && !hasBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: totalPriceWithBreakfast,
          totalPrice: totalPrice + totalPriceWithBreakfast,
        },
      });
    } else checkin({ bookingId });
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add);
              setPaidConfirmed(false);
            }}
            id="breakfast"
          >
            I Want to Add Breakfast for{" "}
            {formatCurrency(totalPriceWithBreakfast)}
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          disabled={paidConfirmed || isCheckin}
          id="confirmPaid"
          checked={paidConfirmed}
          onChange={() => setPaidConfirmed((confirm) => !confirm)}
        >
          I Confirm that {guests.fullName} has paid the total amount of{" "}
          {addBreakfast
            ? `${formatCurrency(
                totalPrice + totalPriceWithBreakfast
              )}(${formatCurrency(totalPrice)}+${formatCurrency(
                totalPriceWithBreakfast
              )}) `
            : formatCurrency(totalPrice)}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button disabled={!paidConfirmed || isCheckin} onClick={handleCheckin}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
