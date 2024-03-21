import {gql} from "@src/__generated__";

export namespace AuthApi {
  export interface LoginReq {
    email: string;
    password: string;
  }

  export const MUTATION_LOGIN = gql(/* GraphQL */ `
    mutation Login($email: String!, $password: String!) {
      loginUser(email: $email, password: $password) {
        token
        user {
          id
          email
          firstName
          lastName
          role
        }
      }
    }
  `);
}
