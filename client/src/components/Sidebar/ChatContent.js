import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 20,
    flexGrow: 1,
  },
  details: {
    width: "85%",
  },
  countContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "15%",
    boxSizing: "border-box",
    margin: "0px 20px",
  },
  username: {
    fontWeight: "bold",
    letterSpacing: -0.2,
  },
  previewText: {
    fontSize: 12,
    color: "#9CADC8",
    letterSpacing: -0.17,
    maxWidth: 250,
    whiteSpace: "nowrap",
    wordWrap: "break-word",
    overflow: "hidden",
  },
  previewTextBold: {
    fontSize: 12,
    color: "#000",
    letterSpacing: -0.17,
    fontWeight: "bold",
    maxWidth: 250,
    whiteSpace: "nowrap",
    wordWrap: "break-word",
    overflow: "hidden",
  },
  notification: {
    height: 20,
    width: 20,
    backgroundColor: "#3F92FF",
    marginRight: 10,
    color: "white",
    fontSize: 10,
    letterSpacing: -0.5,
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  bubble: {
    backgroundColor: "#3A8DFF",
    borderRadius: "15px",
    padding: "2px 8px",
  },
  bubbleText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: -0.2,
  },
}));

const ChatContent = (props) => {
  const classes = useStyles();

  const { conversation } = props;
  const { latestMessageText, otherUser } = conversation;
  const unreadMessages = conversation.messages.filter((message) => {
    return !message.read && message.senderId === otherUser.id;
  });
  const unreadCount = unreadMessages.length;

  return (
    <Box className={classes.root}>
      <Box className={classes.details}>
        <Typography className={classes.username}>
          {otherUser.username}
        </Typography>
        <Typography
          className={
            unreadCount > 0 ? classes.previewTextBold : classes.previewText
          }
        >
          {latestMessageText}
        </Typography>
      </Box>
      {unreadCount > 0 && <UnreadCount count={unreadCount} />}
    </Box>
  );
};

const UnreadCount = (props) => {
  const classes = useStyles();
  const { count } = props;

  return (
    <Box className={classes.countContainer}>
      <Box>
        <Box className={classes.bubble}>
          <Typography className={classes.bubbleText}>{count}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatContent;
