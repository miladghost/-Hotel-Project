import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import { useGetBookings } from "./useGetBookings";
import Pagination from "../../ui/Pagination";
import AddBooking from "./AddBooking";

function BookingTable() {
  const { bookings, isLoading, error, count } = useGetBookings();
  if (error) throw new Error("couldnt get bookings data");
  if (isLoading) return <Spinner />;

  // const filterValue = searchParam.get("status") || "all";
  //Filter CLINET SIDE WAY
  // let filteredBookings;
  // if (filterValue === "all") filteredBookings = bookings;
  // if (filterValue === "checked-out")
  //   filteredBookings = bookings?.filter(
  //     (booking) => booking.status === "checked-out"
  //   );
  // if (filterValue === "checked-in")
  //   filteredBookings = bookings?.filter(
  //     (booking) => booking.status === "checked-in"
  //   );
  // if (filterValue === "unconfirmed")
  //   filteredBookings = bookings?.filter(
  //     (booking) => booking.status === "unconfirmed"
  //   );
  // // Sort CLIENT SIDE WAY
  // const sortValue = searchParam.get("sortBy") || "startDate-asc";
  // const [sortName, direction] = sortValue.split("-");
  // const modifire = direction === "asc" ? 1 : -1;
  // const sortedBookings = [...filteredBookings].sort((a, b) => {
  //   if (sortName.toLowerCase().includes("date")) {
  //     const aDate = new Date(a[sortName]).getTime();
  //     const bDate = new Date(b[sortName]).getTime();
  //     return (aDate - bDate) * modifire;
  //   }

  //   return (a[sortName] - b[sortName]) * modifire;
  // });

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
      <AddBooking />
    </Menus>
  );
}

export default BookingTable;
