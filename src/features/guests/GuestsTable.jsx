import Spinner from "../../ui/Spinner";
import Table from "../../ui/Table";
import { useGetGuests } from "./useGetGuests";

function GuestsTable() {
  const { guests, isLoading } = useGetGuests();
  if (isLoading) return <Spinner />;
  console.log(guests);
  return (
    <Table columns="1fr 1.8fr 2.2fr 1fr 1fr 1fr">
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
        render={(guest) => <div>{guest.fullName}</div>}
      />
    </Table>
  );
}

export default GuestsTable;
