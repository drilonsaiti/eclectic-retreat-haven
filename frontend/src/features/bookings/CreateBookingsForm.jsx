import {useForm} from "react-hook-form";
import Form from "../../ui/Form.jsx";
import FormRow, {Label, StyledFormRow} from "../../ui/FormRow.jsx";
import Input from "../../ui/Input.jsx";
import Grouped from "../../ui/Grouped.jsx";
import Button from "../../ui/Button.jsx";
import {useCreateBooking} from "./useCreateBooking.js";
import Checkbox from "../../ui/Checkbox.jsx";
import {useEffect, useState} from "react";
import Textarea from "../../ui/Textarea.jsx";
import {useUpdateSettings} from "../settings/useUpdateSettings.js";
import {useSettings} from "../settings/useSettings.js";
import Spinner from "../../ui/Spinner.jsx";
import {useBookedDates} from "./useBookedDates.js";
import DatePicker from "react-datepicker";
import {addDays, eachDayOfInterval} from "date-fns";
import Row from "../../ui/Row.jsx";
import "react-datepicker/dist/react-datepicker.css";
import {createGlobalStyle} from "styled-components";
import { Portal } from "react-overlays";
import {differenceInDays} from "date-fns/differenceInDays";
const DatePickerWrapperStyles = createGlobalStyle`
    .date_picker.full-width {
        z-index: 9999 !important; /* Increase the z-index */
        border: 1px solid var(--color-grey-300);
        background-color: var(--color-grey-0);
        border-radius: var(--border-radius-sm);
        padding: 0.8rem 1.2rem;
        box-shadow: var(--shadow-sm);
        display: inline-block;
        width: 28.5%;
    }


    .react-datepicker {
        font-size: 1.3rem !important;
    }

    .react-datepicker__current-month {
        font-size: 1.5rem !important;
    }

    .react-datepicker__header {
        padding-top: 6px !important;
    }

    .react-datepicker__navigation {
        top: 13px !important;
    }

    .react-datepicker__day-name, .react-datepicker__day {
        margin: 0.5rem !important;
    }


    input {
        display: block;
        border: none;
        background-color: transparent;
        
        &:focus {
            outline: none;
        }
    }
`;

const CalendarContainer = ({ children }) => {
    const el = document.getElementById("calendar-portal");

    return <Portal container={el}>{children}</Portal>;
};

const CreateBookingsForm = ({onCloseModal,accommodationId,maxCapacity}) => {
    const [minStartDate, setMinStartDate] = useState('');
    const [maxEndDate, setMaxEndDate] = useState('');
    const [addBreakfast,setAddBreakfast] = useState(false);
    const [addDinner,setAddDinner] = useState(false);
    const {register, handleSubmit,reset,formState,getValues} = useForm();
    const {errors} = formState;
    const {isCreating,createBooking} = useCreateBooking();
    const {isLoading,dataDates} = useBookedDates(accommodationId);
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [bookedDates,setBookedDates] = useState([]);


    const isWorking = isCreating;

    async function getFlagURL(nationality) {
        const apiUrl = `https://restcountries.com/v2/name/${nationality}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            // Extract the alpha-2 (CCA2) code from the response.
            const flagCode = data[0]?.alpha2Code || data[0]?.alpha3Code;

            // Construct the flag URL.
            const flagURL = `https://flagcdn.com/${flagCode.toLowerCase()}.svg`;

            return flagURL;
        } catch (error) {
            console.error('Error fetching country information:', error);
            // Handle errors if needed.
            return null;
        }
    }
    useEffect(() => {
        const fetchBookedDates =  () => {
            try {
                
                const bookedDatesdata = dataDates?.map(bookingDate => ({
                    start: new Date(bookingDate.startDate.split('T')[0]),
                    end: new Date(bookingDate.endDate.split('T')[0])
                }));

                const excludedDates = bookedDatesdata?.flatMap((dates) => {
                    const days = differenceInDays(dates.end, dates.start);
                    const excludedDays = [];

                    for (let i = 0; i <= days; i++) {
                        const currentDate = addDays(dates.start, i);
                        excludedDays.push(currentDate);
                    }

                    return excludedDays;
                });
                setBookedDates(excludedDates);

                const earliestStartDate = bookedDates?.reduce(
                    (earliest, booking) => (booking.start < earliest ? booking.start : earliest),
                    new Date()
                );

                const latestEndDate = bookedDates?.reduce(
                    (latest, booking) => (booking.end > latest ? booking.end : latest),
                    new Date()
                );


                setMinStartDate(earliestStartDate.toISOString().split('T')[0]);
                setMaxEndDate(latestEndDate.toISOString().split('T')[0]);
            } catch (error) {
                console.error('Error fetching booked dates:', error);
            }
        };

        fetchBookedDates();
    }, [accommodationId ]);

    async function onSubmit(data) {
        const countryFlag = await getFlagURL(data.nationality)
        createBooking({
            data: {
                ...data,
                countryFlag: countryFlag,
                hasDinner: addDinner,
                hasBreakfast: addBreakfast,
                startDate: new Date(startDate).toISOString().split('T')[0],
                numNights: differenceInDays(endDate,startDate),
                accommodationId
            }
        }, {
            onSuccess: () => {
                reset();
                onCloseModal?.();
            }
        });
    }

    const isDateDisabled = (date) => {
        // Assuming bookedDates is an array of booked dates in the format { start, end }
        return dataDates.some(booking => date >= new Date(booking.start) && date <= new Date(booking.end));
    };

    if (isWorking) return  <Spinner />
    return (
        <Form onSubmit={handleSubmit(onSubmit)} type={onCloseModal ? 'modal' : 'regular'}>
            <FormRow label="Full name" error={errors?.fullName?.message}>
                <Input type="text" disabled={isWorking}
                       id="name" {...register("fullName", {required: "This field is required"})}/>
            </FormRow>

            <FormRow label="Email" error={errors?.email?.message}>
                <Input type="email" disabled={isWorking}
                       id="email" {...register("email", {required: "This field is required"})}/>
            </FormRow>
            <FormRow label="Country" error={errors?.nationality?.message}>
                <Input type="text" disabled={isWorking}
                       id="nationality" {...register("nationality", {required: "This field is required"})}/>
            </FormRow>

            <FormRow label="Nationality ID" error={errors?.nationalID?.message}>
                <Input type="text" disabled={isWorking}
                       id="nationalID" {...register("nationalID", {required: "This field is required"})}/>
            </FormRow>

                <StyledFormRow label="Calendar"  orientation="horizontal" calendar="calendar">

                        <Label>Calendar</Label>
                        <DatePicker
                            wrapperClassName='date_picker full-width'
                            selectsRange={true}
                            startDate={startDate}
                            endDate={endDate}
                            onChange={(update) => {
                                setDateRange(update);
                            }}

                            excludeDates={bookedDates}
                            containerStyle={{width: '100%'}}
                            isClearable={true}

                            popperModifiers={{ flip: { behavior: ["bottom"] }, preventOverflow: { enabled: false }, hide: { enabled: false } }}
                        />

                        <DatePickerWrapperStyles/>


                </StyledFormRow>


                <FormRow label="Num of guests" error={errors?.numGuests?.message}>
                    <Input type="number" disabled={isWorking} id="numGuests" {...register("numGuests", {
                        required: "This field is required", max: {
                            value: maxCapacity,
                            message: `Maximum allowed guests is ${maxCapacity}`,
                        },
                    })}/>

                </FormRow>


                <FormRow orientation="vertical">
                    <Grouped>
                        <Checkbox
                            checked={addBreakfast}
                            onChange={() => setAddBreakfast((add) => !add)}
                            id="breakfast">
                            Want to add breakfast ?
                        </Checkbox>
                        <Checkbox disabled={isWorking}
                                  checked={addDinner}
                                  onChange={() => {
                                      setAddDinner((add) => !add)
                                  }}
                                  id="dinner">
                            Want to add dinner ?
                        </Checkbox>
                    </Grouped>
                </FormRow>


                {/*<FormRow  label="Dinner" error={errors?.numNights?.message}>
                    <Input type="checkbox" id="dinner" {...register("breakfast",{required:"This field is required"})}/>
                </FormRow>*/}


                <FormRow label="Observations" error={errors?.observations?.message}>
                    <Textarea id="observations"
                              disabled={isWorking} {...register("observations", {required: "This field is required"})}/>
                </FormRow>

                <FormRow>

                    <Button onClick={() => onCloseModal?.()} variation="secondary" type="reset">
                        Cancel
                    </Button>
                    <Button disabled={isWorking}>Book now</Button>
                </FormRow>
        </Form>
);
};

export default CreateBookingsForm;