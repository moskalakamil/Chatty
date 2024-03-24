import {zodResolver} from "@hookform/resolvers/zod";
import {AppButton} from "@src/features/_common/buttons/AppButton";
import {AppInputControlled} from "@src/features/_common/inputs/AppInputControlled";
import getLoginSchema, {
  LoginSchema,
} from "@src/features/auth/_schemas/login.schema";
import {useT} from "@src/i18n/useTranslation";
import {initApp} from "@src/navigation/getAppState";
import {useLoginMutation} from "@src/queries/auth.queries";
import {useAuthStore} from "@src/stores/auth.store";
import {SubmitHandler, useForm} from "react-hook-form";
import {View} from "react-native";

export const LoginForm = () => {
  const {t} = useT();

  const schema = getLoginSchema(t);

  const {control, handleSubmit} = useForm<LoginSchema>({
    mode: "onBlur",
    defaultValues: {
      email: undefined,
      password: undefined,
    },
    resolver: zodResolver(schema),
  });

  const [loginMutation, {loading}] = useLoginMutation(async data => {
    if (!data.loginUser?.token) return;

    useAuthStore.getState().setToken(data.loginUser.token);

    initApp();
  });

  const onSubmit: SubmitHandler<LoginSchema> = ({email, password}) => {
    loginMutation({
      variables: {
        email: email.trim(),
        password: password.trim(),
      },
    });
  };

  return (
    <View className={"w-full flex-grow flex-1 justify-between px-5"}>
      <View>
        <AppInputControlled
          label={t("auth.email")}
          control={control}
          name={"email"}
        />
        <AppInputControlled
          label={t("auth.password")}
          control={control}
          name={"password"}
          mode={"password"}
        />
      </View>
      <AppButton
        title={t("auth.login")}
        loading={loading}
        onPress={handleSubmit(onSubmit)}
      />
    </View>
  );
};
