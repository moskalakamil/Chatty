import {useT} from "@src/i18n/useTranslation";
import {zodResolver} from "@hookform/resolvers/zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {useAuthNavigation} from "@src/features/auth/_navigation/useAuthNavigation";
import {View} from "react-native";
import {AppInputControlled} from "@src/features/_common/inputs/AppInputControlled";
import {AppButton} from "@src/features/_common/buttons/AppButton";
import {useRegisterMutation} from "@src/queries/auth.queries";
import {toast} from "@src/utils/toast";
import getRegisterSchema, {
  RegisterSchema,
} from "@src/features/auth/_schemas/register.schema";

export const RegisterForm = () => {
  const {t} = useT();
  const schema = getRegisterSchema(t);

  const nav = useAuthNavigation();

  const {control, handleSubmit} = useForm<RegisterSchema>({
    mode: "onBlur",
    defaultValues: {
      email: undefined,
      firstName: undefined,
      lastName: undefined,
      password: undefined,
      passwordConfirmation: undefined,
    },
    resolver: zodResolver(schema),
  });

  const [registerMutation, {loading}] = useRegisterMutation(data => {
    toast.success(t("auth.accountCreatedSuccessfully"));
    nav.navigate("Login");
  });

  const onSubmit: SubmitHandler<RegisterSchema> = formData => {
    registerMutation({
      variables: formData,
    });
  };

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
        name={"firstName"}
        autoComplete={"given-name"}
      />
      <AppInputControlled
        label={t("auth.lastName")}
        control={control}
        name={"lastName"}
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
        loading={loading}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};
