import {gql} from "@src/gql/__generated__";

export namespace UserApi {
  export const GET_CURRENT_USER = gql(/* GraphQL */ `
    query user {
      user {
        id
        email
      }
    }
  `);
}
