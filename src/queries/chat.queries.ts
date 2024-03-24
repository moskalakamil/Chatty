import {
  ApolloError,
  OperationVariables,
  useMutation,
  useQuery,
  useSubscription,
} from "@apollo/client";
import {ChatApi} from "@src/gql/chat.gql";
import {parseError} from "@src/utils/error/parseError";
import {toast} from "@src/utils/toast";

export const useGetRooms = (onSuccess?: () => void) => {
  return useQuery(ChatApi.GET_USERS_ROOMS, {
    onCompleted: () => {
      onSuccess?.();
    },
  });
};

export const useGetRoom = (id: string, onSuccess?: () => void) => {
  return useQuery(ChatApi.GET_ROOM, {
    variables: {id},
    onCompleted: () => {
      onSuccess?.();
    },
  });
};

export const useGetHeaderRoom = (id: string, onSuccess?: () => void) => {
  return useQuery(ChatApi.GET_HEADER_ROOM, {
    variables: {id},
    onCompleted: () => {
      onSuccess?.();
    },
  });
};

export const useSendMessage = ({
  onError,
}: {
  onError?: (error: ApolloError, variables?: OperationVariables) => void;
}) => {
  return useMutation(ChatApi.SEND_MESSAGE, {
    onError: (error, clientOptions) => {
      toast.error(parseError(error).message);
      onError?.(error, clientOptions?.variables);
    },
  });
};

export const useSetTypingUser = () => {
  return useMutation(ChatApi.SET_TYPING_USER, {
    onError: error => {
      toast.error(parseError(error).message);
    },
  });
};

export const useGetTypingUser = (id: string) => {
  return useSubscription(ChatApi.GET_TYPING_USER, {
    variables: {
      roomId: id,
    },
    onError: error => {
      toast.error(parseError(error).message);
    },
  });
};
