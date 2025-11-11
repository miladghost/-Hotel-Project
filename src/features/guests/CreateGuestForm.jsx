import { Controller, useForm } from "react-hook-form";
import React, { useMemo } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useCreateNewGuest } from "./useCreateNewGuest";
import { useGetGuests } from "./useGetGuests";
import Spinner from "../../ui/Spinner";
import toast from "react-hot-toast";

const CreateGuestForm = React.memo(function CreateGuestForm({ onCloseModal }) {
  const costumeStyles = useMemo(
    () => ({
      control: (baseStyles, state) => ({
        ...baseStyles,
        backgroundColor: "var(--color-grey-50)",
      }),
      option: (baseStyles, state) => ({
        ...baseStyles,
        backgroundColor: state.isFocused
          ? "var(--color-brand-500)"
          : state.isSelected
          ? "var(--color-brand-500)"
          : "var(--color-grey-50)",
        color: "var(--color-grey-800)",
      }),
      menu: (baseStyles) => ({
        ...baseStyles,
        backgroundColor: "var(--color-grey-50)",
        overflow: "hidden",
      }),
      singleValue: (baseStyles) => ({
        ...baseStyles,
        backgroundColor: "var(--color-grey-50)",
        color: "var(--color-grey-800)",
      }),
      input: (baseStyles) => ({
        ...baseStyles,
        color: "var(--color-grey-900)",
        borderRadius: "var(--border-radius-sm)",
        padding: "7px",
      }),
    }),
    []
  );
  const { guests, isLoading } = useGetGuests();
  const { addGuest, isAdding } = useCreateNewGuest();
  const { register, reset, formState, handleSubmit, control } = useForm();
  const { errors } = formState;
  const options = useMemo(() => countryList().getData(), []);
  if (isLoading) return <Spinner />;
  function onSubmit(data) {
    const { nationalID, email } = data;
    const isDuplicate = guests.some(
      (guest) => guest.email === email || guest.nationalID === nationalID
    );

    const countryFlag = `https://flagcdn.com/${data.nationality.value.toLowerCase()}.svg`;
    if (isDuplicate)
      return toast.error("this user Added before(check your email or ID)");
    addGuest(
      { ...data, countryFlag, nationality: data.nationality.label },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      }
    );
  }

  return (
    <Form type="modal" onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full Name" errors={errors?.fullName?.message}>
        <Input
          disabled={isAdding}
          type="text"
          id="fullName"
          {...register("fullName", { required: "this field is required" })}
        />
      </FormRow>
      <FormRow label="Nationality" errors={errors?.nationality?.message}>
        <Controller
          disabled={isAdding}
          control={control}
          name="nationality"
          rules={{ required: "this field is required" }}
          render={({ field }) => (
            <Select
              {...field}
              options={options}
              placeholder="select Nationality"
              styles={costumeStyles}
            />
          )}
        />
      </FormRow>
      <FormRow label="Email" errors={errors?.email?.message}>
        <Input
          disabled={isAdding}
          type="text"
          id="email"
          {...register("email", {
            required: "this field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "enter a valid email",
            },
          })}
        />
      </FormRow>
      <FormRow label="National ID" errors={errors?.nationalID?.message}>
        <Input
          disabled={isAdding}
          type="text"
          id="nationalID"
          {...register("nationalID", {
            required: "this field is required",
            minLength: {
              value: 10,
              message: "ID must  be 10 digit ",
            },
            maxLength: { value: 10, message: "ID must be 10 digit " },
            pattern: { value: /^[0-9]+$/, message: "only numbers allowed" },
          })}
        />
      </FormRow>
      <FormRow>
        <Button>Add Guest</Button>
        <Button
          disabled={isAdding}
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
      </FormRow>
    </Form>
  );
});

export default CreateGuestForm;
