import styled from "styled-components";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useGetCabinData } from "../cabins/useGetCabinData";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import CheckboxV2 from "../../ui/CheckboxV2";
import { subtractDates } from "../../utils/helpers";
import { useGetSetting } from "../settings/useGetSetting";
import { useGetGuests } from "../guests/useGetGuests";

const Styledselect = styled.select`
  border-radius: var(--border-radius-sm);
  padding: 10px;
  background-color: var(--color-grey-50);
  box-shadow: var(--shadow-sm);
`;
function CreateNewBookingForm() {
  const navigate = useNavigate();
  const { isLoading: isLoading1, cabinsData } = useGetCabinData();
  const { settingData, isLoading: isLoading2 } = useGetSetting();
  const { guests, isLoading: isLoading3 } = useGetGuests();
  const { register, formState, reset, getValues, handleSubmit, watch } =
    useForm({
      defaultValues: {
        isPaid: false,
        hasBreakfast: false,
      },
    });
  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;
  const { breakfastPrice } = settingData;
  const cabinId = watch("cabinId");
  const maxCapacity = cabinsData
    ?.filter((cabin) => cabin.id === Number(cabinId))
    .at(0)?.maxCapacity;
  const { errors } = formState;
  function onSubmit(data) {
    const {
      startDate,
      endDate,
      cabinId,
      email,
      fullName,
      hasBreakfast,
      isPaid,
      numGuests,
      observations,
    } = data;
    const filterdCabinData = cabinsData?.filter(
      (cabin) => cabin.id === Number(cabinId)
    );
    console.log(filterdCabinData);
    const numNights = subtractDates(startDate, endDate) * -1;
    const cabinPrice =
      filterdCabinData?.at(0).regularPrice - filterdCabinData?.at(0).discount;
    console.log(cabinPrice);
    const extrasPrice = hasBreakfast
      ? breakfastPrice * numNights * numGuests
      : 0;
    const totalPrice = cabinPrice + extrasPrice;

    console.log(extrasPrice);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin Name" errors={errors?.cabinId?.message}>
        {/* <Select value={cabinNames} options={cabinNames} /> */}
        <Styledselect
          id="cabinId"
          {...register("cabinId", { required: "this field is required" })}
        >
          <option value="">Select cabin...</option>
          {cabinsData.map((cabin) => (
            <option value={cabin.id} key={cabin.id}>
              {cabin.name}
            </option>
          ))}
        </Styledselect>
      </FormRow>
      <FormRow label="Full Name" errors={errors?.fullName?.message}>
        <Styledselect
          id="fullName"
          {...register("fullName", { required: "this field is required" })}
        >
          <option value="">select guest...</option>
          {guests.map((guest) => (
            <option value={guest.id} key={guest.id}>
              {guest.fullName}
            </option>
          ))}
        </Styledselect>
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
          {...register("numGuests", {
            required: "this field is required",
            min: {
              value: 1,
              message: "it should be at least 1 Guest",
            },
            validate: (value) =>
              Number(value) <= maxCapacity ||
              `should be lesser or equal than ${maxCapacity}(cabin Capacity)`,
          })}
        />
      </FormRow>
      <FormRow label="Is Paid?" errors={errors?.isPaid?.message}>
        <CheckboxV2 id="isPaid" register={register} name="isPaid" />
      </FormRow>
      <FormRow label="Has BreakFast?" errors={errors?.hasBreakfast?.message}>
        <CheckboxV2 id="hasBreakfast" register={register} name="hasBreakfast" />
      </FormRow>
      <FormRow label="Status" errors={errors?.status?.message}>
        <Styledselect
          id="status"
          {...register("status", { required: "this field is required" })}
        >
          <option value="">Select Status..</option>
          <option value=""></option>
        </Styledselect>
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
