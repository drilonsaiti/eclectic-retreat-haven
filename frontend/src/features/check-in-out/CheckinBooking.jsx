import {useEffect, useState} from 'react';
import {useBooking} from "../bookings/useBooking.js";
import {useMoveBack} from "../../hooks/useMoveBack.js";
import {useSettings} from "../settings/useSettings.js";
import Spinner from "../../ui/Spinner.jsx";
import Row from "../../ui/Row.jsx";
import Heading from "../../ui/Heading.jsx";
import ButtonText from "../../ui/ButtonText.jsx";
import BookingDataBox, {Price} from "../bookings/BookingDataBox.jsx";
import Checkbox from "../../ui/Checkbox.jsx";
import {formatCurrency} from "../../utils/helpers.js";
import ButtonGroup from "../../ui/ButtonGroup.jsx";
import Button from "../../ui/Button.jsx";
import {Box} from "../../pages/PageNotFound.jsx";
import {useCheckin} from "./useCheckin.js";
import {useProfile} from "../authentication/useUpdateUser.js";
import AccessDenied from "../../ui/AccessDenied.jsx";


function CheckinBooking() {
    const [confirmPaid, setConfirmPaid] = useState(false);
    const [addBreakfast, setAddBreakfast] = useState(false);
    const [addDinner, setAddDinner] = useState(false);
    const {isLoading, booking} = useBooking();
    const {checkin,isCheckingIn} = useCheckin();
    const moveBack = useMoveBack();
    const {isPending: isLoadingSettings, settings} = useSettings();
    const {profileData,isLoading:isLoadingProfile} = useProfile();

    useEffect(() => setConfirmPaid(booking?.paid ?? false), [booking,addBreakfast]);
    useEffect(() => {
        setAddBreakfast(booking?.hasBreakfast);
        setAddDinner(booking?.hasDinner);
    }, [booking, booking?.hasBreakfast, booking?.hasDinner])

    if (isLoading || isLoadingSettings || isLoadingProfile) return <Spinner/>;
    const {
        bookingId,
        guests,
        totalPrice,
        price: accmPrice,
        extrasPrice,
        numGuests,
        hasBreakfast,
        hasDinner,
        numNights,
        isPaid,
        guestDetails,
        discount
    } = booking;

    if (guestDetails.email !== profileData.email) return <AccessDenied />

    const optionalBreakfastPrice =
        numNights * settings.breakfastPrice * numGuests;
    const optionalDinnerPrice =
        numNights * settings.dinnerPrice * numGuests;

    function handleBreakfast(){
        setAddBreakfast(add => !add);
        const pay = false;
        let extras = {
            hasBreakfast: !addBreakfast,
            hasDinner: addDinner
        };
        checkin({ data:extras,bookingId, pay});
    }

    function handleDinner(){
        setAddBreakfast(add => !add);
        const pay = false;
        let extras = {
            hasBreakfast: addBreakfast,
            hasDinner: !addDinner
        };
        checkin({ data:extras,bookingId, pay});
    }
    function handleCheckin() {
        if (!confirmPaid) return;
        const pay = true;
        let extras = {
            hasBreakfast: addBreakfast,
            hasDinner: addDinner
        };

        checkin({ data:extras,bookingId,pay });
    }


    return (
        <>
            <Row type='horizontal'>
                <Heading type='h1'>Check in booking #{bookingId}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} checkin={true}
                            totalPriceBooking={totalPrice}
                            addBreakfast={addBreakfast} addDinner={addDinner}
                            discount={discount}
                            extrasPriceCheckin={extrasPrice}
            />

            <Box>
              <div style={{marginBottom: '4rem'}}>
                <Checkbox
                    disabled={isPaid || confirmPaid}
                    checked={addBreakfast}
                    onChange={() => {
                        handleBreakfast();
                        setConfirmPaid(false);

                    }}
                    id='breakfast'
                >
                    Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
                </Checkbox>
              </div>
              <Checkbox
                  checked={addDinner}
                  disabled={isPaid || confirmPaid}
                  onChange={() => {
                    handleDinner();
                    setConfirmPaid(false);

                  }}
                  id='dinner'
              >
                Want to add dinner for {formatCurrency(optionalDinnerPrice)}?
              </Checkbox>
            </Box>



            <Box style={{marginBottom: '2rem'}}>
                <Checkbox
                    checked={confirmPaid}
                    onChange={() => setConfirmPaid((confirm) => !confirm)}
                    disabled={isCheckingIn || confirmPaid}
                    id='confirm'
                >
                    I confirm that {guestDetails.fullName} has paid the total amount of{' '}
                    {`${formatCurrency(
                        totalPrice
                    )} (${formatCurrency(accmPrice)} + ${addBreakfast ? formatCurrency(
                        optionalBreakfastPrice
                    ) : '0.00'} for breakfast + ${addDinner ? formatCurrency(
                        optionalDinnerPrice) : '0.00'} for dinner)  ${discount > 0 ? "- "+ formatCurrency(discount)+" discount" : ''}`
                    }
                </Checkbox>
            </Box>

            <ButtonGroup>
                <Button onClick={handleCheckin} disabled={isCheckingIn || !confirmPaid}>
                    Check in booking #{bookingId}
                </Button>
                <Button variation='secondary' onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default CheckinBooking;
