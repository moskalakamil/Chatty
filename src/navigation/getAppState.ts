import {AppState, useAppStateStore} from "@src/stores/app-state-store";
import {
  useShowIntroScreensStore,
} from "@src/stores/show-intro-screens";

export async function getAppState(
  showIntroScreens: boolean,
): Promise<AppState> {
  if (showIntroScreens) {
    return "NEED_AUTH";
  }

  return "AUTHORIZED";
}

export async function initApp(): Promise<[AppState, unknown]> {
  try {
    const showInfoScreens = useShowIntroScreensStore.getState().showIntroScreens;

    const nextState = await getAppState(showInfoScreens);
    useAppStateStore.getState().setAppState(nextState);
    return [nextState, null];
  } catch (e) {
    useAppStateStore.getState().setAppState("NEED_AUTH");
    return ["NEED_AUTH", e];
  }
}
