import {client} from "@src/gql/client";
import {UserApi} from "@src/gql/user.gql";
import {AppState, useAppStateStore} from "@src/stores/app-state-store";
import {useAuthStore} from "@src/stores/auth-store";
import {User, useUserStore} from "@src/stores/user.store";

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

  if (user?.id && user?.email) {
    return [
      "AUTHORIZED",
      {
        id: user.id,
        email: user.email,
      },
    ];
  }

  return ["NEED_AUTH", null];
}

export async function initApp(): Promise<[AppState, unknown]> {
  try {
    console.log("1");
    const token = useAuthStore.getState().token;
    console.log(token, "token123");
    const [nextState, user] = await getAppState(token);

    useAppStateStore.getState().setAppState(nextState);
    useUserStore.getState().setUser(user);

    return [nextState, null];
  } catch (e) {
    useAppStateStore.getState().setAppState("NEED_AUTH");
    return ["NEED_AUTH", e];
  }
}
