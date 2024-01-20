
import {useForm} from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Select from "../../ui/Select";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow.jsx";
import {useCreateAccommodation} from "./useCreateAccommodation.js";
import {useEditAccommodation} from "./useEditAccommodation.js";
import {useAccommodationsTypes} from "./useAccommodations.js";
import {useEffect, useState} from "react";



function CreateAccommodationsForm({accommodationToEdit = {},onCloseModal}) {
    const {accommodationId,...editValues} = accommodationToEdit;
    const isEditSession = Boolean(accommodationId);
    const {register,handleSubmit,reset,getValues,formState} = useForm({
        defaultValues: isEditSession ? editValues : {}
    });
    const {errors} = formState;
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        // Do something that triggers the need to refresh Select
        // For example, after editing an item
        setRefreshKey((prevKey) => prevKey + 1);
    },[]);

    const {typesOptions} = useAccommodationsTypes();

    const {isCreating,createAccommodation} = useCreateAccommodation();
   const {isEditing,editAccommodation} = useEditAccommodation();


    const isWorking = isCreating || isEditing;
    function onSubmit(data) {
        const image = typeof data.image === 'string' ? data.image : data.image[0];

        if (isEditSession) editAccommodation({newData: {...data,image:image},id:accommodationId},{
            onSuccess: () => {
                reset();
                onCloseModal?.();
            },

        })
        else createAccommodation({...data,image:image},{
            onSuccess: () => {
                reset();
                onCloseModal?.();
            }
        });
    }


  return (
    <Form onSubmit={handleSubmit(onSubmit)} type={onCloseModal ? 'modal' : 'regular'}>
      <FormRow label="Accommodation name" error={errors?.name?.message}>
        <Input type="text" disabled={isWorking} id="name" {...register("name",{required:"This field is required"})}/>
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input type="number" disabled={isWorking} id="maxCapacity" {...register("maxCapacity",{required:"This field is required",
        min:{
            value:1,
            message: "Capacity should be at least 1"
        }})}/>
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>

        <Input type="number" disabled={isWorking} id="regularPrice" {...register("regularPrice",{required:"This field is required",
            min:{
                value:1,
                message: "Capacity should be at least 1"
            }})}/>
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>

        <Input type="number" disabled={isWorking} id="discount" defaultValue={0} {...register("discount",{required:"This field is required",
            validate: (value) => value <= getValues().regularPrice || "Discount should be less than regular price"})}/>
      </FormRow>

        <FormRow label="Type" error={errors?.types?.message}>
            <Select key={refreshKey} value={getValues('types')} type="white" options={typesOptions} disabled={isWorking} id="types" {...register("types",{required:"This field is required"})}>

            </Select>
        </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea type="number" disabled={isWorking} id="description" defaultValue="" {...register("description",{required:"This field is required"})}/>
      </FormRow>

      <FormRow label="Accommodation photo" error={errors?.image?.message}>
        <FileInput id="image" accept="image/*"
                   disabled={isWorking}  {...register("image",{required:isEditSession ? false : "This field is required"})}/>
      </FormRow>

      <FormRow>

        <Button onClick={() => onCloseModal?.()} variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession ? "Edit accommodation" : "Add accommodation"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateAccommodationsForm;
