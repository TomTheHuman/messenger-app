import React from "react";
import { Box } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";
import { connect } from "react-redux";
import { updateMessage } from "../../store/utils/thunkCreators";

const Messages = (props) => {
  const { messages, otherUser, userId } = props;

  const handleReadMessage = async (message, otherUser) => {
    if (message.senderId === otherUser.id && message.read === false) {
      const reqBody = {
        message: message,
      };
      await props.updateMessage(reqBody);
    }
  };

  return (
    <Box>
      {messages.map((message) => {
        const time = moment(message.createdAt).format("h:mm");
        handleReadMessage(message, otherUser);
        return message.senderId === userId ? (
          <SenderBubble key={message.id} text={message.text} time={time} />
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

const mapDispatchToProps = (dispatch) => {
  return {
    updateMessage: (message) => {
      dispatch(updateMessage(message));
    },
  };
};

export default connect(null, mapDispatchToProps)(Messages);
