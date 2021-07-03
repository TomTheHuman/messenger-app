import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Avatar } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    marginTop: 8,
  },
  status: {
    fontSize: 11,
    color: "#BECCE2",
    fontWeight: "bold",
    marginBottom: 5,
  },
  profilePic: {
    height: 16,
    width: 16,
  },
}));

const ReadStatus = (props) => {
  const classes = useStyles();
  const { read, otherUser } = props;

  return (
    <Box className={classes.root}>
      {read ? (
        <StatusUserAvatar otherUser={otherUser} />
      ) : (
        <span className={classes.status}>Delivered</span>
      )}
    </Box>
  );
};

const StatusUserAvatar = (props) => {
  const classes = useStyles();
  const { username, photoUrl } = props.otherUser;

  return (
    <Box>
      <Avatar
        alt={username}
        src={photoUrl}
        className={classes.profilePic}
      ></Avatar>
    </Box>
  );
};

export default ReadStatus;
