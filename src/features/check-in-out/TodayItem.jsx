import styled from "styled-components";
import Button from "../../ui/Button";
import CheckoutButton from "./CheckoutButton";
import { Link } from "react-router-dom";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;
function TodayItem({ activity }) {
  return (
    <StyledTodayItem>
      <div>
        {" "}
        {activity.status === "unconfirmed" && <Tag type="green">Arriving</Tag>}
        {activity.status === "checked-in" && <Tag type="blue">Departing</Tag>}
      </div>
      <Flag
        src={activity.guests.countryFlag}
        alt={`Flag ${activity.guests.nationality} `}
      />
      <Guest>{activity.guests.fullName}</Guest>
      <div>{activity.numNights} nights</div>
      <div>
        {activity.status === "unconfirmed" && (
          <Button
            size="small"
            variation="primary"
            as={Link}
            to={`/checkin/${activity.id}`}
          >
            CHECK IN
          </Button>
        )}
        {activity.status === "checked-in" && (
          <CheckoutButton bookingId={activity.id} />
        )}
      </div>
    </StyledTodayItem>
  );
}

export default TodayItem;
