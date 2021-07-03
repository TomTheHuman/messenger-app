import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";
import { connect } from "react-redux";
import { patchMessages } from "../../store/utils/thunkCreators";

async function updateMessages(props, reqBody) {
  if (props.conversation.unreadMessages.otherUser.length > 0) {
    await props.patchMessages(reqBody);
  }
}

const Messages = (props) => {
  const { userId } = props;
  const { messages, otherUser, id } = props.conversation;
  const lastIndex = messages.length - 1;

  // run update messages whenever a chat page is rendered
  updateMessages(props, reqBody);

  return (
    <Box>
      {messages.map((message, index) => {
        const time = moment(message.createdAt).format("h:mm");
        const lastMessage = index === lastIndex;

        return message.senderId === userId ? (
          <SenderBubble
            key={message.id}
            text={message.text}
            time={time}
            lastMessage={lastMessage}
            read={message.read}
            otherUser={otherUser}
          />
        ) : (
          <OtherUserBubble
            key={message.id}
            text={message.text}
            time={time}
            otherUser={otherUser}
          />
        );
      })}
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    conversation:
      state.conversations &&
      state.conversations.find(
        (conversation) =>
          conversation.otherUser.username === state.activeConversation
      ),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    patchMessages: (body) => {
      dispatch(patchMessages(body));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
