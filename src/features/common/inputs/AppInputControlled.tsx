import React from "react";
import {Control, Controller, FieldValues, Path} from "react-hook-form";
import {AppInput, AppInputProps} from "./AppInput";

interface AppInputControlledProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
> extends Omit<AppInputProps, "error"> {
  control: Control<TFieldValues>;
  name: TName;
}

export function AppInputControlled<
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
      render={({field: {onChange, onBlur, value}, fieldState: {error}}) => {
        console.log(error);
        return (
          <AppInput
            onBlur={onBlur}
            // @ts-ignore
            onChangeText={onChange}
            value={value}
            error={error?.message}
            {...inputProps}
          />
        );
      }}
      name={name}
    />
  );
}
