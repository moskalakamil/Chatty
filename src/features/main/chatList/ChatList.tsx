import {AppButton} from "@src/features/_common/buttons/AppButton";
import {useAppStateStore} from "@src/stores/app-state-store";
import {useAuthStore} from "@src/stores/auth-store";

export const ChatList = () => {
  const tmpLogout = () => {
    useAuthStore.getState().setToken(null);
    useAppStateStore.getState().setAppState("NEED_AUTH");
  };

  return <AppButton title={"logout"} className={"mt-10"} onPress={tmpLogout} />;
};
