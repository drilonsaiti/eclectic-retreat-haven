import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
  HiPencil,
  HiTrash,
  HiEye,
  HiArrowUpOnSquare,
  HiArrowDownOnSquare,
} from 'react-icons/hi2';
import Menus from "../../ui/Menus.jsx";
import Table from "../../ui/Table.jsx";
import {format, isToday} from "date-fns";
import {formatCurrency, formatDistanceFromNow} from "../../utils/helpers.js";
import Tag from "../../ui/Tag.jsx";
import Modal from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import {useDeleteBooking} from "./useDeleteBooking.js";
import {useCheckout} from "../check-in-out/useCheckout.js";


const Accomm = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: 'Sono', sans-serif;

  font-weight: 600;
`;

function BookingRow({
  booking: {
    id:bookingId,
    createdAt,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
      types,
    status,
    guestFullName: guestName,
    guestEmail,
    accommodationName: accommName
  },
}) {
  const {deleteMutate, isLoading: isDeleting } = useDeleteBooking();
  const { mutate: checkout, isCheckingOut } = useCheckout();

  const navigate = useNavigate();

console.log(bookingId);
  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  console.log("NAME: " + accommName);
  return (
    <Table.Row role='row'>
      <Accomm>{accommName}</Accomm>


      <Stacked>
        <span>{guestName}</span>
        <span>{guestEmail}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}{' '}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), 'MMM dd yyyy')} &mdash;{' '}
          {format(new Date(endDate), 'MMM dd yyyy')}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              onClick={() => navigate(`/bookings/${bookingId}`)}
              icon={<HiEye />}
            >
              See details
            </Menus.Button>

            {status === 'unconfirmed' && (
              <Menus.Button
                onClick={() => navigate(`/checkin/${bookingId}`)}
                icon={<HiArrowDownOnSquare />}
              >
                Check in
              </Menus.Button>
            )}

            {status === 'checked-in' && (
              <Menus.Button
                onClick={() => {
                  console.log("CHECKED OUT: ",bookingId)
                  checkout(bookingId);
                }}
                disabled={isCheckingOut}

                icon={<HiArrowUpOnSquare />}
              >
                Check out
              </Menus.Button>
            )}

            <Menus.Button icon={<HiPencil />}>Edit booking</Menus.Button>

            <Modal.Open opens='delete'>
              <Menus.Button icon={<HiTrash />}>Delete booking</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>


        <Modal.Window name='delete'>
          <ConfirmDelete
            resource='booking'
            onConfirm={(options) => deleteMutate(bookingId, options)}
            disabled={isDeleting}
          />
        </Modal.Window>
      </Modal>

    </Table.Row>
  );
}

export default BookingRow;
