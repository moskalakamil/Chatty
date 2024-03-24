import * as AbsintheSocket from "@absinthe/socket";
import {createAbsintheSocketLink} from "@absinthe/socket-apollo-link";
import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import {getMainDefinition} from "@apollo/client/utilities";
import {config} from "@src/config";
import {useAuthStore} from "@src/stores/auth.store";
import {Socket as PhoenixSocket} from "phoenix";

const httpLink = createHttpLink({
  uri: config.baseUrl + "/api/graphql",
});

const authLink = setContext((_, {headers}) => {
  const token = useAuthStore.getState().token;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const authedHttpLink = authLink.concat(httpLink);

const phoenixSocket = new PhoenixSocket(config.websocketUrl, {
  params: () => {
    return {token: useAuthStore.getState().token};
  },
});

const absintheSocket = AbsintheSocket.create(phoenixSocket);
const websocketLink = createAbsintheSocketLink(
  absintheSocket,
) as unknown as ApolloLink;

const link = split(
  ({query}) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  websocketLink,
  authedHttpLink,
);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
