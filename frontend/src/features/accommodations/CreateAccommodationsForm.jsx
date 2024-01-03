import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {useForm} from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Select from "../../ui/Select";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow.jsx";
import {createEditAccommodation, getAccommodationsTypes} from "../../services/apiAccommodations.js";



function CreateAccommodationsForm({accommodationToEdit ={}}) {
    const {accommodationId,...editValues} = accommodationToEdit;
    const isEditSession = Boolean(accommodationId);
    const {register,handleSubmit,reset,getValues,formState} = useForm({
        defaultValues: isEditSession ? editValues : {}
    });
    const {errors} = formState;
    const {data:typesOptions} = useQuery({
        queryKey: ['accommodationsTypes'],
        queryFn: getAccommodationsTypes
    })
    const queryClient = useQueryClient();
    const {mutate:createAccommodation,isPending:isCreating} = useMutation({
        mutationFn: createEditAccommodation,
        onSuccess: () => {
            toast.success("New accommodation successfully created");
            queryClient.invalidateQueries({
                queryKey: ['accommodations'],
            });
            reset();
        },
        onError:(err) => toast.error(err.message)
    });

    const {mutate:editAccommodation,isPending: isEditing} = useMutation({
        mutationFn:({newData, id}) => createEditAccommodation(newData,id),
        onSuccess: () => {
            toast.success("Accommodation successfully edited");
            queryClient.invalidateQueries({
                queryKey: ['accommodations'],
            });
            reset();
        },
        onError:(err) => toast.error(err.message)
    });

    const isWorking = isCreating || isEditing;
    function onSubmit(data) {
        const image = typeof data.image === 'string' ? data.image : data.image[0];
        if (isEditSession) editAccommodation({newData: {...data,image:image},id:accommodationId})
        else createAccommodation({data,image:image});
    }

    function onError(errors) {

    }

  return (
    <Form onSubmit={handleSubmit(onSubmit,onError)}>
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
            <Select type="white" disabled={isWorking} id="types" {...register("types",{required:"This field is required"})}>
                {typesOptions?.map(type => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
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

        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession ? "Edit accommodation" : "Add accommodation"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateAccommodationsForm;
