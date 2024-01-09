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


const CreateBookingsForm = ({onCloseModal,accommodationId}) => {
    const [addBreakfast,setAddBreakfast] = useState(false);
    const [addDinner,setAddDinner] = useState(false);
    const {register, handleSubmit,reset,formState,getValues} = useForm();
    const {errors} = formState;
    const {isCreating,createBooking} = useCreateBooking();

    function onSubmit(data) {
        createBooking({ data: { ...data, hasDinner:addDinner,hasBreakfast:addBreakfast,accommodationId }},{
            onSuccess: () => {
                reset();
                onCloseModal?.();
            }
        });
    }
    return (
        <Form onSubmit={handleSubmit(onSubmit)} type={onCloseModal ? 'modal' : 'regular'}>
            <FormRow label="Full name" error={errors?.fullName?.message}>
                <Input type="text" id="name" {...register("fullName",{required:"This field is required"})}/>
            </FormRow>

            <FormRow label="Email" error={errors?.email?.message}>
                <Input type="email" id="email" {...register("email",{required:"This field is required"})}/>
            </FormRow>
            <FormRow label="Nationality" error={errors?.nationality?.message}>
                <Input type="text" id="nationality" {...register("nationality",{required:"This field is required"})}/>
            </FormRow>

            <FormRow label="Start date" error={errors?.startDate?.message}>
                <Input type="date" id="startDate" {...register("startDate",{required:"This field is required"})}/>
            </FormRow>



                <FormRow  label="Num of nights" error={errors?.numNights?.message}>
                    <Input type="number" id="numNights" {...register("numNights",{required:"This field is required"})}/>
                </FormRow>
                <FormRow   label="Num of guests" error={errors?.numGuests?.message}>
                    <Input type="number" id="numGuests" {...register("numGuests",{required:"This field is required"})}/>
                </FormRow>



                <FormRow orientation="vertical">
                    <Grouped>
                <Checkbox
                    checked={addBreakfast}
                    onChange={() => setAddBreakfast((add) => !add)}
                    id="breakfast" >
                            Want to add breakfast ?
                        </Checkbox>
                        <Checkbox
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
                <Textarea  id="observations" {...register("observations",{required:"This field is required"})}/>
            </FormRow>

            <FormRow>

                <Button  onClick={() => onCloseModal?.()}  variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button>Book now</Button>
            </FormRow>
        </Form>
    );
};

export default CreateBookingsForm;