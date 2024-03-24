import {client} from "@src/gql/client";
import {UserApi} from "@src/gql/user.gql";
import {AppState, useAppStateStore} from "@src/stores/app-state-store";
import {useAuthStore} from "@src/stores/auth-store";
import {User, useUserStore} from "@src/stores/user.store";
import {parseError} from "@src/utils/error/parseError";
import {toast} from "@src/utils/toast";

export async function getAppState(
  token: string | null,
): Promise<[AppState, User | null]> {
  if (!token) {
    return ["NEED_AUTH", null];
  }

  const {
    data: {user},
  } = await client.query({
    query: UserApi.GET_CURRENT_USER,
  });

  if (user?.id && user?.firstName) {
    return [
      "AUTHORIZED",
      {
        id: user.id,
        firstName: user.firstName,
      },
    ];
  }

  return ["NEED_AUTH", null];
}

export async function initApp(): Promise<[AppState, unknown]> {
  try {
    const token = useAuthStore.getState().token;

    const [nextState, user] = await getAppState(token);

    useAppStateStore.getState().setAppState(nextState);
    useUserStore.getState().setUser(user);

    return [nextState, null];
  } catch (e) {
    toast.error(parseError(e).message);
    useAppStateStore.getState().setAppState("NEED_AUTH");
    return ["NEED_AUTH", e];
  }
}

export async function logoutUser() {
  client.resetStore();
  useAuthStore.getState().setToken(null);
  useAppStateStore.getState().setAppState("NEED_AUTH");
}
