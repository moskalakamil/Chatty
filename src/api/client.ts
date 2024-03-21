import {ApolloClient, InMemoryCache} from "@apollo/client";
import {config} from "@src/config";

const client = new ApolloClient({
    uri: config.baseUrl + "/api/graphql",
    cache: new InMemoryCache()
});
