import React from "react";
import {AppButton} from "@src/common/buttons/AppButton";
import {useT} from "@src/i18n/useTranslation";
import {useLoginMutation, useRegisterMutation} from "@src/queries/auth.queries";
import {zodResolver} from "@hookform/resolvers/zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";
import {TFunction} from "@src/i18n/TFunction";
import {initApp} from "@src/navigation/getAppState";
import {View, Text, Pressable} from "react-native";
import {AuthInputControlled} from "@src/features/auth/components/AuthInputControlled.tsx";
import {Icon} from "@src/assets/Icon.tsx";
import {useAuthNavigation} from "@src/features/auth/navigation/useAuthNavigation.ts";
import {useAppStateStore} from "@src/stores/app-state-store.ts";
import {toast} from "@src/utils/toast.tsx";

function getSchema(t: TFunction) {
  const schema = z.object({
    email: z
      .string({required_error: t("auth:error.required")})
      .email({message: t("auth:error.invalid-email")}),
    username: z.string({required_error: t("auth:error.required")}),
    password: z
      .string({required_error: t("auth:error.required")})
      .min(6, t("auth:error.password-min", {length: 6})),
  });
  return schema;
}

export type RegisterSchema = z.infer<ReturnType<typeof getSchema>>;

export const RegisterForm = () => {
  const {t} = useT();
  const schema = getSchema(t);

  const nav = useAuthNavigation();

  const {control, handleSubmit, getValues} = useForm<RegisterSchema>({
    mode: "onBlur",
    defaultValues: {
      email: undefined,
      username: undefined,
      password: undefined,
    },
    resolver: zodResolver(schema),
  });
  const mutation = useRegisterMutation({
    onSuccess() {
      console.log("success");
      toast.success(t("auth:registerSuccess"));
      nav.navigate("Verify", {
        email: getValues("email"),
        mode: "REGISTER",
      });
    },
  });
  const onSubmit: SubmitHandler<RegisterSchema> = formData => {
    // initApp({
    //   createProfile: true,
    // });
    mutation.mutate({
      email: formData.email,
      username: formData.username,
      password: formData.password,
    });
  };

  return (
    <>
      <View className="mx-4 flex-[2] mt-28 w-96 max-w-full rounded-lg px-4">
        <Text className="mb-12 text-center font-medium text-3xl text-slate-700">
          {t("auth:login")}
        </Text>
        <View className="flex flex-col gap-3">
          <View>
            <AuthInputControlled
              control={control}
              icon={<Icon name={"emailSign"} width={23} height={23} />}
              name="email"
              autoComplete="email"
              autoCapitalize="none"
              placeholder={t("auth:emailOrUsername")}
            />
          </View>

          <View>
            <AuthInputControlled
              control={control}
              icon={<Icon name={"username"} width={23} height={23} />}
              name="username"
              placeholder={t("auth:username")}
            />
          </View>

          <View>
            <AuthInputControlled
              control={control}
              icon={<Icon name={"passwordLock"} width={22} height={22} />}
              name="password"
              passwordMode
              autoComplete={"password"}
              placeholder={t("auth:password")}
            />
          </View>
        </View>
      </View>
      <View className="mx-4 flex-[2] w-96 px-4">
        <View className="mt-10">
          <AppButton
            title={t("auth:login")}
            textStyle={{fontWeight: "500", fontSize: 16}}
            onPress={handleSubmit(onSubmit)}
            loading={mutation.isPending}
          />
        </View>
        <View className={"flex flex-row my-10 items-center"}>
          <View className={"h-[1px] flex-1 bg-neutral-500"} />
          <Text
            className={"bg-white inline w-auto mx-0.5 font-medium text-base"}>
            {t("auth:or")}
          </Text>
          <View className={"h-[1px] flex-1 bg-neutral-500"} />
        </View>
        <View className={"flex flex-row mx-auto"}>
          <Text className={"font-medium"}>{t("auth:haveAccount")}</Text>
          <Pressable
            className={"border-b border-b-primary-500 pb-[3px]"}
            onPress={() => nav.navigate("Login")}>
            <Text className={"font-medium"}> {t("auth:login")}</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};
