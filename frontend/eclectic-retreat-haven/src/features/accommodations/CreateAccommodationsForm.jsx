import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Select from "../../ui/Select";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createAccommodation, getAccommodationsTypes} from "../../services/apiAccommodations.js";
import toast from "react-hot-toast";
import {useForm} from "react-hook-form";
import Spinner from "../../ui/Spinner.jsx";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function CreateAccommodationsForm() {
    const {register,handleSubmit,reset} = useForm();
    const {isPending:isPendingTypes,data:typesOptions} = useQuery({
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
    console.log(typesOptions);
    function onSubmit(data) {
        mutate(data);
    }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="name">Accommodation name</Label>
        <Input type="text" id="name" {...register("name")}/>
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input type="number" id="maxCapacity" {...register("maxCapacity")}/>
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input type="number" id="regularPrice" {...register("regularPrice")}/>
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input type="number" id="discount" defaultValue={0} {...register("discount")}/>
      </FormRow>

        <FormRow>
            <Label htmlFor="type">Types</Label>
            <Select type="white" {...register("type")}>
                {typesOptions && typesOptions.map((type, index) => (
                    <option key={index} value={type}>
                        {type}
                    </option>
                ))}
            </Select>
        </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea type="number" id="description" defaultValue="" {...register("description")}/>
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Accommodation photo</Label>
          <Input type="text" id="image" defaultValue={0} {...register("image")}/>
       {/* <FileInput id="image" accept="image/*" />*/}
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
