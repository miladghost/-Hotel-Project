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
import { useCreateNewBooking } from "./useCreateNewBooking";
const Styledselect = styled.select`
  border-radius: var(--border-radius-sm);
  padding: 10px;
  background-color: var(--color-grey-50);
  box-shadow: var(--shadow-sm);
`;
function CreateNewBookingForm() {
  const navigate = useNavigate();
  const { addBooking, isAdding } = useCreateNewBooking();
  const { isLoading: isLoading1, cabinsData } = useGetCabinData();
  const { settingData, isLoading: isLoading2 } = useGetSetting();
  const { guests, isLoading: isLoading3 } = useGetGuests();
  const { register, formState, reset, handleSubmit, watch } = useForm({
    defaultValues: {
      isPaid: false,
      hasBreakfast: false,
    },
  });
  if (isLoading1 || isLoading2 || isLoading3) return <Spinner />;
  const { breakfastPrice } = settingData;
  const cabinId = watch("cabinId");
  const guestId = watch("guestId");
  const email = guests
    ?.filter((guest) => guest.id === Number(guestId))
    ?.at(0)?.email;
  const maxCapacity = cabinsData
    ?.filter((cabin) => cabin.id === Number(cabinId))
    .at(0)?.maxCapacity;
  const { errors } = formState;
  function onSubmit(data) {
    const { startDate, endDate, cabinId, hasBreakfast, numGuests } = data;
    const filterdCabinData = cabinsData?.filter(
      (cabin) => cabin.id === Number(cabinId)
    );
    const numNights = subtractDates(startDate, endDate) * -1;
    const cabinPrice =
      numNights *
      (filterdCabinData?.at(0).regularPrice - filterdCabinData?.at(0).discount);
    const extrasPrice = hasBreakfast
      ? breakfastPrice * numNights * numGuests
      : 0;
    const totalPrice = cabinPrice + extrasPrice;
    addBooking(
      {
        ...data,
        extrasPrice,
        totalPrice,
        cabinPrice,
        numNights,
        cabinId,
        guestId,
      },

      {
        onSuccess: (data) => {
          console.log(data);
          reset();
          navigate(-1, { replace: true });
        },
      }
    );
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin Name" errors={errors?.cabinId?.message}>
        <Styledselect
          disabled={isAdding}
          id="cabinId"
          {...register("cabinId", {
            required: "this field is required",
            valueAsNumber: true,
          })}
        >
          <option value="">Select cabin...</option>
          {cabinsData.map((cabin) => (
            <option value={cabin.id} key={cabin.id}>
              {cabin.name}
            </option>
          ))}
        </Styledselect>
      </FormRow>
      <FormRow label="Full Name" errors={errors?.guestId?.message}>
        <Styledselect
          disabled={isAdding}
          id="guestId"
          {...register("guestId", {
            required: "this field is required",
            valueAsNumber: true,
          })}
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
        <Input type="email" id="email" defaultValue={email} disabled />
      </FormRow>
      <FormRow label="Start date" errors={errors?.startDate?.message}>
        <Input
          disabled={isAdding}
          type="date"
          id="startDate"
          {...register("startDate", {
            required: "this field is required",
            setValueAs: (value) =>
              value ? new Date(value).toISOString() : null,
          })}
        />
      </FormRow>
      <FormRow label="End date" errors={errors?.endDate?.message}>
        <Input
          disabled={isAdding}
          type="date"
          id="endDate"
          {...register("endDate", {
            required: "this field is required",
            setValueAs: (value) =>
              value ? new Date(value).toISOString() : null,
          })}
        />
      </FormRow>
      <FormRow label="Number Of Guests" errors={errors?.numGuests?.message}>
        <Input
          disabled={isAdding}
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
        <CheckboxV2
          disabled={isAdding}
          id="isPaid"
          register={register}
          name="isPaid"
        />
      </FormRow>
      <FormRow label="Has BreakFast?" errors={errors?.hasBreakfast?.message}>
        <CheckboxV2
          disabled={isAdding}
          id="hasBreakfast"
          register={register}
          name="hasBreakfast"
        />
      </FormRow>

      <FormRow errors={errors?.observations?.message} label="Observations">
        <Textarea
          disabled={isAdding}
          id="observations"
          {...register("observations")}
        />
      </FormRow>
      <FormRow>
        <Button disabled={isAdding}>Add Booking</Button>
        <Button
          disabled={isAdding}
          variation="secondary"
          onClick={() => navigate(-1)}
        >
          Back to Bookings
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateNewBookingForm;
