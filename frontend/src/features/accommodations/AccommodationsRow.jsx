import styled from "styled-components";
import {formatCurrency} from "../../utils/helpers.js";
import Button from "../../ui/Button.jsx";
import ButtonGroup from "../../ui/ButtonGroup.jsx";
import CreateAccommodationsForm from "./CreateAccommodationsForm.jsx";
import {useDeleteAccommodation} from "./useDeleteAccommodation.js";
import {HiPencil, HiSquare2Stack, HiTrash} from "react-icons/hi2";
import {useCreateAccommodation} from "./useCreateAccommodation.js";
import Modal from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus.jsx";
import CreateBookingsForm from "../bookings/CreateBookingsForm.jsx";



const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Accommodation = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono",sans-serif;
`;

const Price = styled.div`
  font-family: "Sono",sans-serif;
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono",sans-serif;
  font-weight: 500;
  color: var(--color-green-700);
`;



// eslint-disable-next-line react/prop-types
const AccommodationsRow = ({accommodation}) => {
    const {accommodationId,name,maxCapacity,regularPrice,discount,image,types,description} = accommodation;

    const {isCreating,createAccommodation} = useCreateAccommodation();
    const {isDeleting,deleteMutate} = useDeleteAccommodation();

    function handleDuplicate() {
        createAccommodation({
            name: `Copy of ${name}`,
            maxCapacity,
            regularPrice,
            discount,
            image,
            types,
            description,
        });
    }
    return (
        <Table.Row role="row">
            <Img src={image}/>
            <Accommodation>{name}</Accommodation>
            <div>Fits up to {maxCapacity} guests</div>
            <Price>{formatCurrency(regularPrice)}</Price>
            <Discount>{formatCurrency(discount)}</Discount>

                <Modal>
                    <ButtonGroup>
                    <Modal.Open opens="book">
                        <Button>Book now</Button>
                    </Modal.Open>
                    <Menus.Menu>
                        <Menus.Toggle id={accommodationId} />
                        <Menus.List id={accommodationId}>
                            <Menus.Button icon={<HiSquare2Stack/> } onClick={handleDuplicate}>Duplicate</Menus.Button>
                            <Modal.Open opens="edit">
                                <Menus.Button icon={<HiPencil/> }>Edit</Menus.Button>
                            </Modal.Open>
                            <Modal.Open opens="delete">
                                <Menus.Button icon={<HiTrash/> }>Delete</Menus.Button>
                            </Modal.Open>

                        </Menus.List>
                    </Menus.Menu>

                    </ButtonGroup>
                    <Modal.Window name="book">
                        <CreateBookingsForm accommodationId={accommodationId}/>
                    </Modal.Window>

                    <Modal.Window name="edit">
                        <CreateAccommodationsForm accommodationToEdit={accommodation} />
                    </Modal.Window>

                    <Modal.Window name="delete">
                        <ConfirmDelete resource="accommodations" disabled={isDeleting} onConfirm={() => deleteMutate(accommodationId)}/>
                    </Modal.Window>
                </Modal>
        </Table.Row>
    );
};

export default AccommodationsRow;