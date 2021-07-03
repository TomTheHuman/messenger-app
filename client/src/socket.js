import io from "socket.io-client";
import store from "./store";
import {
  setNewMessage,
  removeOfflineUser,
  addOnlineUser,
  readConvo,
} from "./store/conversations";

const socket = io(window.location.origin);

socket.on("connect", () => {
  console.log("connected to server");

  socket.on("add-online-user", (id) => {
    store.dispatch(addOnlineUser(id));
  });

  socket.on("remove-offline-user", (id) => {
    store.dispatch(removeOfflineUser(id));
  });
  socket.on("new-message", (data) => {
    console.log("NEW MESSAGE");
    store.dispatch(
      setNewMessage(data.message, data.onSenderClient, data.sender)
    );
  });
  socket.on("read-message", (body) => {
    store.dispatch(readConvo(body.conversationId, body.onSenderClient));
  });
});

export default socket;
