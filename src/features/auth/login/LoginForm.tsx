import React, {useEffect} from "react";
import {useT} from "@src/i18n/useTranslation";
import {zodResolver} from "@hookform/resolvers/zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";
import {TFunction} from "@src/i18n/TFunction";
import {View, Text, Pressable} from "react-native";
import {useAuthNavigation} from "@src/features/auth/navigation/useAuthNavigation";
import {useLoginMutation} from "@src/queries/auth.queries";
import {AppInputControlled} from "@src/features/common/inputs/AppInputControlled";
import {AppButton} from "@src/features/common/buttons/AppButton";

function getSchema(t: TFunction) {
  const schema = z.object({
    email: z
      .string({required_error: t("error.required")})
      .email(t("error.email")),
    password: z
      .string({required_error: t("error.required")})
      .min(6, t("error.password-min", {count: 6})),
  });
  return schema;
}

export type LoginSchema = z.infer<ReturnType<typeof getSchema>>;

export const LoginForm = () => {
  const {t} = useT();

  const schema = getSchema(t);

  const nav = useAuthNavigation();

  const {control, handleSubmit} = useForm<LoginSchema>({
    mode: "onBlur",
    defaultValues: {
      email: undefined,
      password: undefined,
    },
    resolver: zodResolver(schema),
  });

  const [loginMutation, {loading}] = useLoginMutation(data => {
    console.log("success");
  });

  const onSubmit: SubmitHandler<LoginSchema> = ({email, password}) => {
    loginMutation({
      variables: {
        email,
        password,
      },
    });
  };

  return (
    <>
      <View className={"w-full"}>
        <AppInputControlled label={"test"} control={control} name={"email"} />
        <AppInputControlled
          control={control}
          name={"password"}
          mode={"password"}
        />
        <AppButton
          title={t("login")}
          loading={loading}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </>
  );
};
