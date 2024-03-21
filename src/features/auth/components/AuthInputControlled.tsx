import React from "react";
import {Control, Controller, FieldValues, Path} from "react-hook-form";
import {
  AuthInput,
  AuthInputProps,
} from "@src/features/auth/components/AuthInput.tsx";

interface AppInputControlledProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
> extends Omit<AuthInputProps, "error"> {
  control: Control<TFieldValues>;
  name: TName;
}

export function AuthInputControlled<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
>({
  control,
  name,
  ...inputProps
}: AppInputControlledProps<TFieldValues, TName>) {
  return (
    <Controller
      control={control}
      render={({field: {onChange, onBlur, value}, fieldState: {error}}) => (
        <AuthInput
          onBlur={onBlur}
          // @ts-ignore
          onChangeText={onChange}
          value={value}
          error={error?.message}
          {...inputProps}
        />
      )}
      name={name}
    />
  );
}
