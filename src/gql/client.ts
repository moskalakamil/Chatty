import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import {config} from "@src/config";
import {useAuthStore} from "@src/stores/auth-store";

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

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
