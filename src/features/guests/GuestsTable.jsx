import React from "react";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import GuestRow from "./GuestRow";
import { useGetGuests } from "./useGetGuests";
import { useGetBookingForGuests } from "./useGetBookingForGuests";
// import { useSearchParams } from "react-router-dom";
const GuestsTable = React.memo(function GuestsTable() {
  // const [searchParams] = useSearchParams();
  const { bookingForGuest, isLoading: isLoading2 } = useGetBookingForGuests();
  const { guests, isLoading, count } = useGetGuests();
  if (isLoading || isLoading2) return <Spinner />;
  // const bookingStatus = searchParams.get("bookingStatus") || "all";
  // const newGuestArr = guests.map((guest) => {
  //   return {
  //     ...guest,
  //     hasBooking: bookingForGuest.some(
  //       (booking) => booking.guestId === guest.id
  //     ),
  //   };
  // });
  // const filteredGuest =
  //   (bookingStatus === "all" && newGuestArr) ||
  //   (bookingStatus === "hasBooking" &&
  //     newGuestArr.filter((arr) => arr.hasBooking)) ||
  //   (bookingStatus === "noBooking" &&
  //     newGuestArr.filter((arr) => !arr.hasBooking));
  return (
    <Table columns="18rem 14rem 11rem 12rem 20rem 0.1fr">
      <Table.Header>
        <div>full name</div>
        <div>email</div>
        <div>national Id</div>
        <div>nationality</div>
        <div>Flag &mdash; status</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={guests}
        render={(guest) => (
          <GuestRow
            key={guest.id}
            bookingForGuest={bookingForGuest}
            guest={guest}
          />
        )}
      />
      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Table>
  );
});

export default GuestsTable;
