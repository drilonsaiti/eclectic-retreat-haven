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
import {createAccommodation, getAccommodationsTypes} from "../../services/apiAccommodations.js";



function CreateAccommodationsForm() {
    const {register,handleSubmit,reset,getValues,formState} = useForm();
    const {errors} = formState;
    const {data:typesOptions} = useQuery({
        queryKey: ['accommodationsTypes'],
        queryFn: getAccommodationsTypes
    })
    const queryClient = useQueryClient();
    const {mutate,isPending} = useMutation({
        mutationFn: createAccommodation,
        onSuccess: () => {
            toast.success("New accommodation successfully created");
            queryClient.invalidateQueries({
                queryKey: ['accommodations'],
            });
            reset();
        },
        onError:(err) => toast.error(err.message)
    });
    function onSubmit(data) {
        console.log(data);
        mutate({data,image:data.image[0]});
    }

    function onError(errors) {

    }

  return (
    <Form onSubmit={handleSubmit(onSubmit,onError)}>
      <FormRow label="Accommodation name" error={errors?.name?.message}>
        <Input type="text" disabled={isPending} id="name" {...register("name",{required:"This field is required"})}/>
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input type="number" disabled={isPending} id="maxCapacity" {...register("maxCapacity",{required:"This field is required",
        min:{
            value:1,
            message: "Capacity should be at least 1"
        }})}/>
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>

        <Input type="number" disabled={isPending} id="regularPrice" {...register("regularPrice",{required:"This field is required",
            min:{
                value:1,
                message: "Capacity should be at least 1"
            }})}/>
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>

        <Input type="number" disabled={isPending} id="discount" defaultValue={0} {...register("discount",{required:"This field is required",
            validate: (value) => value <= getValues().regularPrice || "Discount should be less than regular price"})}/>
      </FormRow>

        <FormRow label="Type" error={errors?.types?.message}>
            <Select type="white" disabled={isPending} id="types" {...register("types",{required:"This field is required"})}>
                {typesOptions?.map(type => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </Select>
        </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea type="number" disabled={isPending} id="description" defaultValue="" {...register("description",{required:"This field is required"})}/>
      </FormRow>

      <FormRow label="Accommodation photo" error={errors?.image?.message}>
        <FileInput id="image" accept="image/*"
                   disabled={isPending}  {...register("image",{required:"This field is required"})}/>
      </FormRow>

      <FormRow>

        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isPending}>Add accommodation</Button>
      </FormRow>
    </Form>
  );
}

export default CreateAccommodationsForm;
