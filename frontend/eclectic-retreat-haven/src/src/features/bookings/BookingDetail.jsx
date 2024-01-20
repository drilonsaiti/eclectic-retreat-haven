import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDeleteBooking } from './useDeleteBooking';
import {useMoveBack} from "../../hooks/useMoveBack.js";
import Spinner from "../../ui/Spinner.jsx";
import Row from "../../ui/Row.jsx";
import Heading from "../../ui/Heading.jsx";
import Tag from "../../ui/Tag.jsx";
import ButtonText from "../../ui/ButtonText.jsx";
import ButtonGroup from "../../ui/ButtonGroup.jsx";
import Button from "../../ui/Button.jsx";
import Modal from "../../ui/Modal.jsx";
import ConfirmDelete from "../../ui/ConfirmDelete.jsx";
import {useBooking} from "./useBooking.js";
import BookingDataBox from "./BookingDataBox.jsx";


import {useCheckout} from "../check-in-out/useCheckout.js";
import Empty from "../../ui/Empty.jsx";
import {useProfile} from "../authentication/useUpdateUser.js";
import AccessDenied from "../../ui/AccessDenied.jsx";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { isLoading,booking } = useBooking();
  const { deleteMutate, isLoading: isDeleting } = useDeleteBooking();
  const { mutate: checkout, isCheckingOut } = useCheckout();
    const {profileData,isLoading:isLoadingProfile} = useProfile();


  const moveBack = useMoveBack();
  const navigate = useNavigate();

  console.log(booking);
   if (isLoading || isLoadingProfile) return <Spinner />;
  if (!booking) return <Empty resource='booking' />;

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  const { bookingId, status,
      guestDetails: { email}} = booking;

  if (email !== profileData.email) return <AccessDenied />

  return (
    <>
      <Row type='horizontal'>
        <HeadingGroup>
          <Heading type='h1'>Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <div style={{marginTop: '2rem'}}>
      <ButtonGroup>
        {status === 'unconfirmed' && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}

        {status === 'checked-in' && (
          <Button onClick={() => checkout(bookingId)} disabled={isCheckingOut}>
            Check out
          </Button>
        )}

        <Modal>
          <Modal.Open opens='delete'>
            <Button variation='danger'>Delete booking</Button>
          </Modal.Open>
          <Modal.Window name='delete'>
            <ConfirmDelete
              resource='booking'
              onConfirm={() =>
                  deleteMutate(bookingId, {
                      onSettled: () => navigate(-1),
                  })
              }              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>

        <Button variation='secondary' onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
      </div>
    </>
  );
}

export default BookingDetail;
