import {useForm} from "react-hook-form";
import Form from "../../ui/Form.jsx";
import FormRow from "../../ui/FormRow.jsx";
import Input from "../../ui/Input.jsx";
import Grouped from "../../ui/Grouped.jsx";
import Button from "../../ui/Button.jsx";
import {useCreateBooking} from "./useCreateBooking.js";
import Checkbox from "../../ui/Checkbox.jsx";
import {useState} from "react";
import Textarea from "../../ui/Textarea.jsx";
import {useUpdateSettings} from "../settings/useUpdateSettings.js";
import {useSettings} from "../settings/useSettings.js";
import Spinner from "../../ui/Spinner.jsx";


const CreateBookingsForm = ({onCloseModal,accommodationId,maxCapacity}) => {
    const [addBreakfast,setAddBreakfast] = useState(false);
    const [addDinner,setAddDinner] = useState(false);
    const {register, handleSubmit,reset,formState,getValues} = useForm();
    const {errors} = formState;
    const {isCreating,createBooking} = useCreateBooking();


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

    async function onSubmit(data) {
        const countryFlag = await getFlagURL(data.nationality)
        createBooking({
            data: {
                ...data,
                countryFlag: countryFlag,
                hasDinner: addDinner,
                hasBreakfast: addBreakfast,
                accommodationId
            }
        }, {
            onSuccess: () => {
                reset();
                onCloseModal?.();
            }
        });
    }

    if (isWorking) return  <Spinner />
    return (
        <Form onSubmit={handleSubmit(onSubmit)} type={onCloseModal ? 'modal' : 'regular'}>
            <FormRow label="Full name" error={errors?.fullName?.message}>
                <Input type="text"  disabled={isWorking} id="name" {...register("fullName",{required:"This field is required"})}/>
            </FormRow>

            <FormRow label="Email" error={errors?.email?.message}>
                <Input type="email"  disabled={isWorking} id="email" {...register("email",{required:"This field is required"})}/>
            </FormRow>
            <FormRow label="Country" error={errors?.nationality?.message}>
                <Input type="text"  disabled={isWorking} id="nationality" {...register("nationality",{required:"This field is required"})}/>
            </FormRow>

            <FormRow label="Nationality ID" error={errors?.nationalID?.message}>
                <Input type="text"  disabled={isWorking} id="nationalID" {...register("nationalID",{required:"This field is required"})}/>
            </FormRow>

            <FormRow label="Start date" error={errors?.startDate?.message}>
                <Input type="date"  disabled={isWorking} id="startDate" {...register("startDate",{required:"This field is required"})}/>
            </FormRow>



                <FormRow  label="Num of nights" error={errors?.numNights?.message}>
                    <Input type="number"  disabled={isWorking} id="numNights" {...register("numNights",{required:"This field is required"})}/>
                </FormRow>
                <FormRow   label="Num of guests" error={errors?.numGuests?.message}>
                    <Input type="number"  disabled={isWorking}  id="numGuests" {...register("numGuests",{required:"This field is required", max: {
                            value: maxCapacity,
                            message: `Maximum allowed guests is ${maxCapacity}`,
                        },})}/>

                </FormRow>



                <FormRow orientation="vertical">
                    <Grouped>
                <Checkbox
                    checked={addBreakfast}
                    onChange={() => setAddBreakfast((add) => !add)}
                    id="breakfast" >
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
                <Textarea  id="observations"  disabled={isWorking} {...register("observations",{required:"This field is required"})}/>
            </FormRow>

            <FormRow>

                <Button  onClick={() => onCloseModal?.()}  variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button disabled={isWorking}>Book now</Button>
            </FormRow>
        </Form>
    );
};

export default CreateBookingsForm;