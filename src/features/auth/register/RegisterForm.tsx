import React from "react";
import {useT} from "@src/i18n/useTranslation";
import {zodResolver} from "@hookform/resolvers/zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";
import {TFunction} from "@src/i18n/TFunction";
import {useAuthNavigation} from "@src/features/auth/navigation/useAuthNavigation";
import {View} from "react-native";
import {AppInputControlled} from "@src/features/common/inputs/AppInputControlled";
import {AppButton} from "@src/features/common/buttons/AppButton";

function getSchema(t: TFunction) {
  const schema = z
    .object({
      email: z
        .string({required_error: t("error.required")})
        .email({message: t("error.email")}),
      firstname: z.string({required_error: t("error.required")}),
      lastname: z.string({required_error: t("error.required")}),
      password: z
        .string({required_error: t("error.required")})
        .min(6, t("error.password-min", {count: 6})),
      passwordConfirmation: z
        .string({required_error: t("error.required")})
        .min(6, t("error.password-min", {count: 6})),
    })
    .refine(data => data.password === data.passwordConfirmation, {
      message: t("error.passwordsDoNotMatch"),
      path: ["passwordConfirmation"],
    });
  return schema;
}

export type RegisterSchema = z.infer<ReturnType<typeof getSchema>>;

export const RegisterForm = () => {
  const {t} = useT();
  const schema = getSchema(t);

  const nav = useAuthNavigation();

  const {control, handleSubmit} = useForm<RegisterSchema>({
    mode: "onBlur",
    defaultValues: {
      email: undefined,
      firstname: undefined,
      lastname: undefined,
      password: undefined,
      passwordConfirmation: undefined,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<RegisterSchema> = formData => {};

  return (
    <View className={"w-full flex-grow flex-1 pt-8 justify-between px-5"}>
      <AppInputControlled
        label={t("auth.email")}
        control={control}
        name={"email"}
      />
      <AppInputControlled
        label={t("auth.firstName")}
        control={control}
        name={"firstname"}
        autoComplete={"given-name"}
      />
      <AppInputControlled
        label={t("auth.lastName")}
        control={control}
        name={"lastname"}
        autoComplete={"family-name"}
      />
      <AppInputControlled
        label={t("auth.password")}
        mode={"password"}
        control={control}
        name={"password"}
        autoComplete={"password"}
      />
      <AppInputControlled
        label={t("auth.passwordConfirmation")}
        mode={"password"}
        control={control}
        name={"passwordConfirmation"}
        autoComplete={"password"}
      />
      <AppButton
        className={"mt-8"}
        title={t("auth.signUp")}
        // loading={loading}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};
