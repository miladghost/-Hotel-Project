import styled from "styled-components";
import Table from "../../ui/Table";
import { HiOutlineUser } from "react-icons/hi2";
import Menus from "../../ui/Menus";
import { FaPencil } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteGuest } from "./useDeleteGuest";
import CreateGuestForm from "./CreateGuestForm";
import Tag from "../../ui/Tag";
import { useMemo } from "react";
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
    padding: 6px;

    display: flex;
    align-items: center;
    justify-content: center;
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
  font-weight: 500;
  text-transform: uppercase;
  font-size: 1.3rem;
`;
const StyledFlag = styled.img`
  width: 60px;
  border-radius: 9px;
  background-color: var(--color-grey-50);
  padding: 3px;
`;
const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.9rem;
`;
function GuestRow({ guest, bookingForGuest }) {
  const { remove, isDeleting } = useDeleteGuest();
  const { fullName, email, nationalID, nationality, countryFlag, id } = guest;
  const hasBooking = useMemo(() => {
    return (
      bookingForGuest?.length > 0 &&
      bookingForGuest?.some((booking) => booking?.guestId === id)
    );
  }, [bookingForGuest, id]);
  return (
    <Modal>
      <Table.Row>
        <StyledFullName>
          <span>
            <HiOutlineUser />
          </span>
          {fullName}
        </StyledFullName>
        <StyledEmail>{email}</StyledEmail>
        <StyledP>{nationalID}</StyledP>
        <StyledP>{nationality}</StyledP>
        <StyledDiv>
          <StyledFlag src={countryFlag} />
          {hasBooking ? (
            <Tag type="blue">has booking</Tag>
          ) : (
            <Tag type="red">no booking</Tag>
          )}
        </StyledDiv>

        <Menus>
          <Menus.Menu>
            <Menus.Toggle id="openGuest" />
            <Menus.List id="openGuest">
              <Modal.Open opens="editGuest">
                <Menus.Button icon={<FaPencil />}>Edit</Menus.Button>
              </Modal.Open>
              <Modal.Open opens="deleteGuest">
                <Menus.Button icon={<FaTrashAlt />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>
            <Modal.Window name="editGuest">
              <CreateGuestForm guestToEdit={guest} />
            </Modal.Window>
            <Modal.Window name="deleteGuest">
              <ConfirmDelete
                disabled={isDeleting}
                onConfirm={() => remove(id)}
                resourceName="Guest"
              />
            </Modal.Window>
          </Menus.Menu>
        </Menus>
      </Table.Row>
    </Modal>
  );
}

export default GuestRow;
