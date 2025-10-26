import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { IoDuplicate } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

// const TableRow = styled.div`
//   display: grid;
//   /* grid-template-columns: 1fr 1.8fr 2.2fr 1fr 1fr 1fr; */
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 10rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
  padding: 2px 2px 2px 2px;
  margin: 2px;
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;
function CabinRow({ cabin }) {
  const { deleteCabin, isDeleting } = useDeleteCabin();

  const { createCabin, isCreating } = useCreateCabin();
  const {
    name,
    image,
    regularPrice,
    discount,
    maxCapacity,
    id: cabinId,
    description,
  } = cabin;

  function handleDuplicate() {
    createCabin({
      name: "Copy of " + name,
      image,
      regularPrice,
      discount,
      maxCapacity,
      description,
    });
  }
  return (
    <>
      <Table.Row>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>
          {!discount ? <span>&mdash;</span> : formatCurrency(discount)}
        </Discount>
        <div style={{ display: "flex", gap: "5px" }}>
          <button onClick={handleDuplicate} disabled={isCreating}>
            <IoDuplicate />
          </button>
          <Modal>
            <Modal.Open opens="edit">
              <button>
                <MdModeEditOutline />
              </button>
            </Modal.Open>
            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>
            <Modal.Open opens="delete">
              <button disabled={isDeleting}>
                <RiDeleteBin5Fill />
              </button>
            </Modal.Open>
            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="cabins"
                disabled={isDeleting}
                onConfirm={() => deleteCabin(cabinId)}
              />
            </Modal.Window>
          </Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />
            <Menus.List id={cabinId}>
              <Menus.Button onClick={handleDuplicate} icon={<IoDuplicate />}>
                Duplicate
              </Menus.Button>
              <Menus.Button icon={<MdModeEditOutline />}>Edit</Menus.Button>
              <Menus.Button icon={<RiDeleteBin5Fill />}>Delete</Menus.Button>
            </Menus.List>
          </Menus.Menu>
        </div>
      </Table.Row>
    </>
  );
}

export default CabinRow;
