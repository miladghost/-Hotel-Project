import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import GuestRow from "./GuestRow";
import { useGetGuests } from "./useGetGuests";

function GuestsTable() {
  const { guests, isLoading, count } = useGetGuests();
  if (isLoading) return <Spinner />;
  console.log(guests);
  console.log(count);
  return (
    <Table columns="1fr 1fr 1fr 1fr 1fr 1rem">
      <Table.Header>
        <div>full name</div>
        <div>email</div>
        <div>national Id</div>
        <div>nationality</div>
        <div>Flag</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={guests}
        render={(guest) => <GuestRow key={guest.id} guest={guest} />}
      />
      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Table>
  );
}

export default GuestsTable;
