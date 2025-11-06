import styled from "styled-components";
import Table from "../../ui/Table";
import { HiOutlineUser } from "react-icons/hi2";

const StyledFullName = styled.p`
  text-transform: capitalize;
  background-color: var(--color-grey-50);
  border-radius: 10px;
  padding: 5px;
  color: var(--color-grey-900);
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 10px;
  & span {
    background-color: var(--color-brand-500);
    border-radius: 50%;
    padding: 4px;
  }
`;
const StyledEmail = styled.p`
  color: var(--color-grey-500);
  text-decoration: underline;
  border-radius: 10px;
  padding: 4px;
  text-align: center;
`;
const StyledP = styled.p`
  color: var(--color-grey-900);
`;
const StyledFlag = styled.img`
  width: 60px;
  border-radius: 9px;
  background-color: var(--color-grey-50);
  padding: 3px;
`;
function GuestRow({ guest }) {
  return (
    <Table.Row>
      <StyledFullName>
        <span>
          <HiOutlineUser />
        </span>
        {guest.fullName}
      </StyledFullName>
      <StyledEmail>{guest.email}</StyledEmail>
      <StyledP>{guest.nationalID}</StyledP>
      <StyledP>{guest.nationality}</StyledP>
      <StyledFlag src={guest.countryFlag} />
    </Table.Row>
  );
}

export default GuestRow;
