import axios from "axios";
import socket from "../../socket";
import {
  gotConversations,
  addConversation,
  setNewMessage,
  setSearchedUsers,
  readConvo,
} from "../conversations";
import { gotUser, setFetchingStatus } from "../user";

// USER THUNK CREATORS

export const fetchUser = () => async (dispatch) => {
  dispatch(setFetchingStatus(true));
  try {
    const { data } = await axios.get("/auth/user");
    dispatch(gotUser(data));
    if (data.id) {
      socket.emit("go-online", data.id);
    }
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(setFetchingStatus(false));
  }
};

export const register = (credentials) => async (dispatch) => {
  try {
    const { data } = await axios.post("/auth/register", credentials);
    dispatch(gotUser(data));
    socket.emit("go-online", data.id);
  } catch (error) {
    console.error(error);
    dispatch(gotUser({ error: error.response.data.error || "Server Error" }));
  }
};

export const login = (credentials) => async (dispatch) => {
  try {
    const { data } = await axios.post("/auth/login", credentials);
    dispatch(gotUser(data));
    socket.emit("go-online", data.id);
  } catch (error) {
    console.error(error);
    dispatch(gotUser({ error: error.response.data.error || "Server Error" }));
  }
};

export const logout = (id, convoIds) => async (dispatch) => {
  try {
    await axios.delete("/auth/logout");
    dispatch(gotUser({}));
    socket.emit("leave-rooms", { id: id, convoIds: convoIds });
    socket.emit("logout", id);
  } catch (error) {
    console.error(error);
  }
};

// CONVERSATIONS THUNK CREATORS

export const fetchConversations = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/conversations");
    dispatch(gotConversations(data));

    const convoIds = data.map((convo) => convo.id);
    socket.emit("join-rooms", {
      convoIds: convoIds,
    });
  } catch (error) {
    console.error(error);
  }
};

const saveMessage = async (body) => {
  const { data } = await axios.post("/api/messages", body);
  return data;
};

// onSenderClient lets the reducer know where the request originated
const sendMessage = (data, body) => {
  socket.emit("new-message", {
    message: data.message,
    onSenderClient: false,
    sender: data.sender,
    recipientId: body.recipientId,
  });
};

// message format to send: {recipientId, text}
// conversationId will be set to null if its a brand new conversation
export const postMessage = (body) => async (dispatch) => {
  try {
    const data = await saveMessage(body);

    if (!body.conversationId) {
      dispatch(addConversation(body.recipientId, data.message));
    } else {
      dispatch(setNewMessage(data.message, true));
    }

    sendMessage(data, body);
  } catch (error) {
    console.error(error);
  }
};

const saveReadMessages = async (body) => {
  const { data } = await axios.patch("/api/messages", body);
  return data;
};

// onSenderClient lets the reducer know where the request originated
const markMessagesRead = (body) => {
  socket.emit("read-message", {
    conversationId: body.conversationId,
    onSenderClient: false,
    recipientId: body.otherUser.id,
  });
};

export const patchMessages = (body) => async (dispatch) => {
  try {
    const data = await saveReadMessages(body);
    if (data.read) {
      dispatch(readConvo(body.conversationId, true));
    }
    markMessagesRead(body);
  } catch (error) {
    console.error(error);
  }
};

export const searchUsers = (searchTerm) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/users/${searchTerm}`);
    dispatch(setSearchedUsers(data));
  } catch (error) {
    console.error(error);
  }
};
