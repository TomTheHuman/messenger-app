import React, { useEffect, useRef } from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { SenderBubble, OtherUserBubble } from "../ActiveChat";
import moment from "moment";
import { connect } from "react-redux";
import { patchMessages } from "../../store/utils/thunkCreators";

async function updateMessages(props, reqBody) {
  if (props.conversation.unreadMessages.otherUser.length > 0) {
    await props.patchMessages(reqBody);
  }
}

const useStyles = makeStyles((theme) => ({
  messagesCtnr: {
    overflowY: "scroll",
    height: "100%",

    // legacy browser will use standard scrollbar
    // Modern browsers will use modern scrollbar
    "&::-webkit-scrollbar": {
      width: theme.spacing(1.5),
      height: theme.spacing(1.5),
    },
    "&::-webkit-scrollbar-track": {
      background: theme.palette.scrollBar.track,
      borderRadius: theme.spacing(1.25),
    },
    "&::-webkit-scrollbar-thumb": {
      background: theme.palette.scrollBar.thumb,
      borderRadius: theme.spacing(1.25),
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: theme.palette.scrollBar.thumbHover,
    },
  },
}));

const Messages = (props) => {
  const { userId } = props;
  const { messages, otherUser, id } = props.conversation;
  const classes = useStyles();
  const lastIndex = messages.length - 1;

  const messagesEndRef = useRef(null);

  // scrolls to blank div at bottom of chat window on render
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [props]);

  const reqBody = {
    conversationId: id,
    otherUser: otherUser,
    currentUser: props.user.id,
  };

  // run update messages whenever a chat page is rendered
  updateMessages(props, reqBody);

  return (
    <Box className={classes.messagesCtnr}>
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
      <div ref={messagesEndRef} />
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
