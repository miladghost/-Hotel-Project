import styled from "styled-components";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useGetCabinData } from "../cabins/useGetCabinData";
import Textarea from "../../ui/Textarea";
import Checkbox from "../../ui/Checkbox";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
const Styledselect = styled.select`
  border-radius: var(--border-radius-sm);
  padding: 10px;
  background-color: var(--color-grey-50);
  box-shadow: var(--shadow-sm);
`;
function CreateNewBookingForm() {
  const { isLoading, cabinsData } = useGetCabinData();
  const navigate = useNavigate();
  const { register, formState, reset, getValues, handleSubmit } = useForm({
    defaultValues: {
      isPaid: false,
      hasBreakfast: false,
    },
  });
  const { errors } = formState;
  if (isLoading) return <Spinner />;
  function onSubmit(data) {
    console.log(data);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin Name" errors={errors?.name?.message}>
        {/* <Select value={cabinNames} options={cabinNames} /> */}
        <Styledselect
          id="name"
          {...register("name", { required: "this field is required" })}
        >
          {cabinsData.map((cabin) => (
            <option value={cabin.name} key={cabin.id}>
              {cabin.name}
            </option>
          ))}
        </Styledselect>
      </FormRow>
      <FormRow label="Full Name" errors={errors?.fullName?.message}>
        <Input
          id="fullName"
          type="text"
          {...register("fullName", { required: "this field is required" })}
        />
      </FormRow>
      <FormRow label="Email" errors={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "this field is required",
            pattern: { value: /\S+@\S+\.\S+/, message: "enter a valid email" },
          })}
        />
      </FormRow>
      <FormRow label="Start date" errors={errors?.startDate?.message}>
        <Input
          type="date"
          id="startDate"
          {...register("startDate", { required: "this field is required" })}
        />
      </FormRow>
      <FormRow label="End date" errors={errors?.endDate?.message}>
        <Input
          type="date"
          id="endDate"
          {...register("endDate", { required: "this field is required" })}
        />
      </FormRow>
      <FormRow label="Number Of Guests" errors={errors?.numGuests?.message}>
        <Input
          type="number"
          id="numGuests"
          {...register("numGuests", { required: "this field is required" })}
        />
      </FormRow>
      <FormRow label="Is Paid?" errors={errors?.isPaid?.message}>
        <Checkbox id="isPaid" register={register} name="isPaid" />
      </FormRow>
      <FormRow label="Has BreakFast?" errors={errors?.hasBreakfast?.message}>
        <Checkbox id="hasBreakfast" register={register} name="hasBreakfast" />
      </FormRow>
      <FormRow errors={errors?.observations?.message} label="Observations">
        <Textarea id="observations" {...register("observations")} />
      </FormRow>
      <FormRow>
        <Button>Add Booking</Button>
        <Button variation="secondary" onClick={() => navigate(-1)}>
          Back to Bookings
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateNewBookingForm;
