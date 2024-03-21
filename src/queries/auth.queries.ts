import {useMutation} from "@apollo/client";
import {AuthApi} from "@src/api/auth.api";
import {toast} from "@src/utils/toast";
import {LoginMutation} from "@src/__generated__/graphql";

export const useLoginMutation = (onSuccess?: (data: LoginMutation) => void) => {
  return useMutation(AuthApi.MUTATION_LOGIN, {
    onCompleted: data => {
      onSuccess?.(data);
    },
    onError: error => toast.error(error.message),
  });
};
