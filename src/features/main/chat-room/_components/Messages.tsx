import RenderInputToolbar from "@src/features/main/chat-room/_components/RenderInputToolbar";
import {RenderMessage} from "@src/features/main/chat-room/_components/RenderMessage";
import {RenderSend} from "@src/features/main/chat-room/_components/RenderSend";
import {UserTyping} from "@src/features/main/chat-room/_components/UserTyping";
import {
  RoomQuery,
  TypingUserSubscriptionSubscription,
} from "@src/gql/__generated__/graphql";
import {useSendMessage} from "@src/queries/chat.queries";
import {useUserStore} from "@src/stores/user.store";
import {parseError} from "@src/utils/error/parseError";
import {toast} from "@src/utils/toast";
import React, {useState, useCallback} from "react";
import {GiftedChat, IMessage} from "react-native-gifted-chat";

type Room = NonNullable<RoomQuery["room"]>;

export const parseMessageToIMessage = (
  message: NonNullable<Room["messages"]>[0],
): IMessage => {
  return {
    _id: message?.id!,
    text: message?.body!,
    createdAt: new Date(message?.insertedAt!),
    user: {
      _id: message?.user?.id!,
      name: message?.user?.firstName!,
    },
  };
};

interface MessageProps {
  roomData: NonNullable<RoomQuery["room"]>;
  typingUser: TypingUserSubscriptionSubscription["typingUser"];
  onTyping: () => void;
}
export function Messages({roomData, typingUser, onTyping}: MessageProps) {
  const [messages, setMessages] = useState<IMessage[]>(
    roomData.messages!.map(parseMessageToIMessage),
  );

  const {user} = useUserStore();

  const [sendMessageMutation] = useSendMessage({
    onError: (e, variables) => {
      toast.error(parseError(e).message);
      setMessages(previousMessages =>
        GiftedChat.append(
          previousMessages.filter(msg => msg.text !== variables?.body),
          [createFailedMessageAlert(variables?.body)],
        ),
      );
    },
  });

  const createFailedMessageAlert = useCallback(
    (text: string): IMessage => {
      return {
        _id: Date.now().toString(36) + Math.random().toString(36),
        text: `${text}\n*Failed to send message.`,
        user: {_id: user?.id!},
        createdAt: new Date(),
      };
    },
    [user?.id],
  );

  const onSend = useCallback(
    (msg: IMessage[]) => {
      const body = msg[0]?.text.trim();

      if (!body) return;

      sendMessageMutation({
        variables: {
          body,
          roomId: roomData?.id!,
        },
      });

      setMessages(previousMessages => GiftedChat.append(previousMessages, msg));
    },
    [sendMessageMutation, roomData?.id],
  );

  return (
    <GiftedChat
      minInputToolbarHeight={120}
      onInputTextChanged={text => {
        if (text === "") return;
        onTyping();
      }}
      messagesContainerStyle={{marginHorizontal: 15}}
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: user?.id!,
        name: user?.firstName!,
      }}
      renderFooter={() =>
        !!typingUser && typingUser.id !== user?.id ? <UserTyping /> : null
      }
      renderInputToolbar={RenderInputToolbar}
      renderDay={() => null}
      renderTime={() => null}
      renderSend={RenderSend}
      renderMessage={message => (
        <RenderMessage
          prevMessage={message.previousMessage}
          currentMessage={message.currentMessage}
          nextMessage={message.nextMessage}
          myId={user?.id!}
        />
      )}
    />
  );
}
