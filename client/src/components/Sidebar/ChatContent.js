import React from "react";
import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: 20,
    flexGrow: 1,
    width: "100%",
    overflow: "hidden",
  },
  details: {
    flexGrow: 1,
    width: "65%",
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
    whiteSpace: "nowrap",
    wordWrap: "break-word",
    overflow: "hidden",
  },
  previewTextBold: {
    fontSize: 12,
    color: "#000",
    letterSpacing: -0.17,
    fontWeight: "bold",
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
  const unreadCount = conversation.unreadMessages.otherUser.length;

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
      {unreadCount > 0 && <UnreadCount unread={unreadCount} />}
    </Box>
  );
};

const UnreadCount = (props) => {
  const classes = useStyles();

  return (
    <Box className={classes.countContainer}>
      <Box>
        <Box className={classes.bubble}>
          <Typography className={classes.bubbleText}>{props.unread}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatContent;
