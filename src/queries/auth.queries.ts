import {useMutation} from "@apollo/client";
import {toast} from "@src/utils/toast";
import {AuthApi} from "@src/gql/auth.gql";
import {LoginMutation, RegisterMutation} from "@src/gql/__generated__/graphql";
import {parseError} from "@src/utils/error/parseError";

export const useLoginMutation = (onSuccess?: (data: LoginMutation) => void) => {
  return useMutation(AuthApi.LOGIN_USER, {
    onCompleted: data => {
      onSuccess?.(data);
    },
    onError: error => toast.error(parseError(error).message),
  });
};

export const useRegisterMutation = (
  onSuccess?: (data: RegisterMutation) => void,
) => {
  return useMutation(AuthApi.REGISTER_USER, {
    onCompleted: data => {
      onSuccess?.(data);
    },
    onError: error => toast.error(parseError(error).message),
  });
};
