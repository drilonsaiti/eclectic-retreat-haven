import styled from "styled-components";
import {formatCurrency} from "../../utils/helpers.js";
import Button from "../../ui/Button.jsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {deleteAccommodation, getAccommodations, getAccommodationsTypes} from "../../services/apiAccommodations.js";
import toast from "react-hot-toast";
import ButtonGroup from "../../ui/ButtonGroup.jsx";
import {useState} from "react";
import CreateAccommodationsForm from "./CreateAccommodationsForm.jsx";

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
    const {accommodationId,name,maxCapacity,regularPrice,discount,image,types} = accommodation;

    const queryClient = useQueryClient();
    const {isPending,mutate} = useMutation({
        mutationFn:  deleteAccommodation,
        onSuccess: () => {
            toast.success("Accommodation successfully deleted")
            queryClient.invalidateQueries({
                queryKey: ['accommodations'],
            })
        },
        onError: (error) => toast.error(error.message)
    })
    return (
        <>
        <TableRow role="row">
            <Img src={image} />
            <Accommodation>{name}</Accommodation>
            <div>Fits up to {maxCapacity} guests</div>
            <Price>{formatCurrency(regularPrice)}</Price>
            <Discount>{formatCurrency(discount)}</Discount>
            <ButtonGroup>
                <Button variation="secondary" onClick={() => setShowForm(!showForm)} disabled={isPending}
                >Edit</Button>
                <Button variation="danger" onClick={() => mutate(accommodationId)} disabled={isPending}
                >Delete</Button>
            </ButtonGroup>
        </TableRow>

    {showForm && <CreateAccommodationsForm accommodationToEdit={accommodation}/>}
    </>
    );
};

export default AccommodationsRow;