import React, { useEffect } from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";
import { connect } from "react-redux";
import { patchMessages } from "../../store/utils/thunkCreators";

const Messages = (props) => {
  const { userId } = props;
  const { messages, otherUser } = props.conversations;
  const lastIndex = messages.length - 1;

  return (
    <Box>
      {messages.map((message, index) => {
        const time = moment(message.createdAt).format("h:mm");

        return message.senderId === userId ? (
          <SenderBubble
            key={message.id}
            text={message.text}
            time={time}
            lastMessage={index === lastIndex}
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
    conversations:
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
