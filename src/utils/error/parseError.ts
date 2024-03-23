import {ApolloError} from "@apollo/client";
import i18next from "i18next";

const parseErrorMessage = (message: string) => {
  switch (message) {
    case "Invalid credentials":
      return i18next.t("error.invalidData");
    default:
      return message;
  }
};

export const parseError = (e: unknown) => {
  if (e instanceof ApolloError) {
    let errMsg = parseErrorMessage(e.message);

    if (e.graphQLErrors && e.graphQLErrors.length > 0) {
      const {message} = e.graphQLErrors[0]!;
      errMsg = parseErrorMessage(message);

      // eslint-disable-next-line
      if (e.graphQLErrors[0]!.hasOwnProperty("errors")) {
        //@ts-ignore
        const {errors} = e.graphQLErrors[0];
        if (errors.split("can't be blank")[1] !== undefined) {
          errMsg = errors.split("can't be blank")[1];
          return new Error(errMsg);
        }
        errMsg = parseErrorMessage(errors) || errMsg;
        return new Error(errMsg);
      }
    }

    return new Error(errMsg);
  }
  if (e instanceof Error) {
    return e;
  }

  if (typeof e === "string") {
    return new Error(e);
  }

  return new Error(i18next.t("error.unknownError"));
};
