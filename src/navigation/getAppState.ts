import {AppState, useAppStateStore} from "@src/stores/app-state-store";
import {useAuthStore} from "@src/stores/auth-store";

export async function getAppState(token: string | null): Promise<AppState> {
  if (token) {
    return "AUTHORIZED";
  }

  return "NEED_AUTH";
}

export async function initApp(): Promise<[AppState, unknown]> {
  try {
    const token = useAuthStore.getState().token;

    const nextState = await getAppState(token);
    useAppStateStore.getState().setAppState(nextState);
    return [nextState, null];
  } catch (e) {
    useAppStateStore.getState().setAppState("NEED_AUTH");
    return ["NEED_AUTH", e];
  }
}
