import GuestsTable from "../features/guests/GuestsTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Guest() {
  return (
    <>
      <Row type="horizontal">
        <Heading>Guests..</Heading>
        <p>filter/sort</p>
      </Row>
      <Row>
        <GuestsTable />
      </Row>
    </>
  );
}

export default Guest;
