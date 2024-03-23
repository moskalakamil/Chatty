import {useT} from "@src/i18n/useTranslation";
import {zodResolver} from "@hookform/resolvers/zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {View} from "react-native";
import {useAuthNavigation} from "@src/features/auth/_navigation/useAuthNavigation";
import {useLoginMutation} from "@src/queries/auth.queries";
import {AppInputControlled} from "@src/features/_common/inputs/AppInputControlled";
import {AppButton} from "@src/features/_common/buttons/AppButton";
import getLoginSchema, {
  LoginSchema,
} from "@src/features/auth/_schemas/login.schema";
import {useAuthStore} from "@src/stores/auth-store";
import {initApp} from "@src/navigation/getAppState";

export const LoginForm = () => {
  const {t} = useT();

  const schema = getLoginSchema(t);

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
    if (!data.loginUser?.token) return;

    useAuthStore.getState().setToken(data.loginUser.token);

    initApp();
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
