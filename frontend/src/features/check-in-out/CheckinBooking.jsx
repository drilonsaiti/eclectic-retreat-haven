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
import DataItem from "../../ui/DataItem.jsx";
import {HiOutlineCurrencyDollar} from "react-icons/hi2";
import {useCheckin} from "./useCheckin.js";


function CheckinBooking() {
    const [confirmPaid, setConfirmPaid] = useState(false);
    const [addBreakfast, setAddBreakfast] = useState(false);
    const [addDinner, setAddDinner] = useState(false);
    const {isLoading, booking} = useBooking();
    const {checkin,isCheckingIn} = useCheckin();
    const moveBack = useMoveBack();
    const {isPending: isLoadingSettings, settings} = useSettings();
    console.log("CHECKIN: ", booking);

    useEffect(() => setConfirmPaid(booking?.paid ?? false), [booking]);
    useEffect(() => {
        setAddBreakfast(booking?.hasBreakfast);
        setAddDinner(booking?.hasDinner);
    }, [booking, booking?.hasBreakfast, booking?.hasDinner])

    if (isLoading || isLoadingSettings) return <Spinner/>;
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
        guestDetails
    } = booking;


    const optionalBreakfastPrice =
        numNights * settings.breakfastPrice * numGuests;
    const optionalDinnerPrice =
        numNights * settings.dinnerPrice * numGuests;

    function handleCheckin() {
        if (!confirmPaid) return;

        let extras = {
            hasBreakfast: addBreakfast,
            hasDinner: addDinner
        };

        console.log("EXTRAS: ",extras)
        checkin({ data:extras,bookingId });
    }

    return (
        <>
            <Row type='horizontal'>
                <Heading type='h1'>Check in booking #{bookingId}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} checkin={true}
                            totalPriceBooking={totalPrice + (hasDinner ? 0 : addDinner ? optionalDinnerPrice : 0)
                                +
                                (hasBreakfast ? 0 : addBreakfast ? optionalBreakfastPrice : 0)}
                            addBreakfast={addBreakfast} addDinner={addDinner}
                            extrasPriceCheckin={(addBreakfast ? optionalBreakfastPrice : 0) + (addDinner ? optionalDinnerPrice : 0)}
            />

            <Box>
              <div style={{marginBottom: '4rem'}}>
                <Checkbox
                    checked={addBreakfast}
                    onChange={() => {
                        setAddBreakfast((add) => !add);
                        setConfirmPaid(false);
                    }}
                    id='breakfast'
                >
                    Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
                </Checkbox>
              </div>
              <Checkbox
                  checked={addDinner}
                  onChange={() => {
                    setAddDinner((add) => !add);
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
                        totalPrice + (hasDinner ? 0 : addDinner ? optionalDinnerPrice : 0) + (hasBreakfast ? 0 : addBreakfast ? optionalBreakfastPrice : 0)
                    )} (${formatCurrency(accmPrice)} + ${addBreakfast ? formatCurrency(
                        optionalBreakfastPrice
                    ) : '0.00'} for breakfast + ${addDinner ? formatCurrency(
                        optionalDinnerPrice) : '0.00'} for dinner)`
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
