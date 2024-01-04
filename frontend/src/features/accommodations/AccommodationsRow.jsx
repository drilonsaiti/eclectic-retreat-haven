import styled from "styled-components";
import {formatCurrency} from "../../utils/helpers.js";
import Button from "../../ui/Button.jsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deleteAccommodation, getAccommodations, getAccommodationsTypes} from "../../services/apiAccommodations.js";
import toast from "react-hot-toast";
import ButtonGroup from "../../ui/ButtonGroup.jsx";
import {useState} from "react";
import CreateAccommodationsForm from "./CreateAccommodationsForm.jsx";
import {useDeleteAccommodation} from "./useDeleteAccommodation.js";
import {HiPencil, HiSquare2Stack, HiTrash} from "react-icons/hi2";
import {useCreateAccommodation} from "./useCreateAccommodation.js";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;


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
    const [showForm,setShowForm] = useState(false);
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
        <>
        <TableRow role="row">
            <Img src={image} />
            <Accommodation>{name}</Accommodation>
            <div>Fits up to {maxCapacity} guests</div>
            <Price>{formatCurrency(regularPrice)}</Price>
            <Discount>{formatCurrency(discount)}</Discount>
            <ButtonGroup>
                <Button variation="primary" onClick={() => setShowForm(!showForm)} disabled={isDeleting}
                ><HiPencil/> </Button>
                <Button variation="secondary" onClick={handleDuplicate} disabled={isCreating}
                ><HiSquare2Stack/> </Button>
                <Button variation="danger" onClick={() => deleteMutate(accommodationId)} disabled={isDeleting}
                > <HiTrash /> </Button>
            </ButtonGroup>
        </TableRow>

    {showForm && <CreateAccommodationsForm accommodationToEdit={accommodation}/>}
    </>
    );
};

export default AccommodationsRow;