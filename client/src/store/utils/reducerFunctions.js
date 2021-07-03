export const addMessageToStore = (state, payload) => {
  const { message, onSenderClient, sender } = payload;
  // if sender isn't null, that means the message needs to be put in a brand new convo
  if (sender !== null) {
    const unread = {
      index: 0,
      senderId: message.senderId,
    };

    const newConvo = {
      id: message.conversationId,
      otherUser: sender,
      messages: [message],
      unreadMessages: {
        currentUser: [],
        otherUser: [],
      },
    };

    // update unread messages store based on where request originated
    if (onSenderClient) {
      newConvo.unreadMessages.currentUser.push(unread);
    } else {
      newConvo.unreadMessages.otherUser.push(unread);
    }

    newConvo.latestMessageText = message.text;
    return [newConvo, ...state];
  }

  return state.map((convo) => {
    if (convo.id === message.conversationId) {
      const convoCopy = { ...convo };
      convoCopy.messages.push(message);

      // update unread messages store based on where request originated
      const index = convoCopy.messages.length - 1;
      let unread = {
        index: index,
        senderId: message.senderId,
      };
      if (onSenderClient) {
        convoCopy.unreadMessages.currentUser.push(unread);
      } else {
        convoCopy.unreadMessages.otherUser.push(unread);
      }

      convoCopy.latestMessageText = message.text;

      return convoCopy;
    } else {
      return convo;
    }
  });
};

// locates message by convo id and message id and marks as read
export const readConvoInStore = (state, payload) => {
  const { conversationId, onSenderClient } = payload;

  return state.map((convo) => {
    if (convo.id === conversationId) {
      const convoCopy = { ...convo };

      // update unread messages store based on where request originated
      if (onSenderClient) {
        for (let i = 0; i < convoCopy.unreadMessages.otherUser.length; i++) {
          let index = convoCopy.unreadMessages.otherUser[i].index;
          convoCopy.messages[index].read = true;
        }
        convoCopy.unreadMessages.otherUser = [];
      } else {
        for (let i = 0; i < convoCopy.unreadMessages.currentUser.length; i++) {
          let index = convoCopy.unreadMessages.currentUser[i].index;
          convoCopy.messages[index].read = true;
        }
        convoCopy.unreadMessages.currentUser = [];
      }

      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addOnlineUserToStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = true;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const removeOfflineUserFromStore = (state, id) => {
  return state.map((convo) => {
    if (convo.otherUser.id === id) {
      const convoCopy = { ...convo };
      convoCopy.otherUser.online = false;
      return convoCopy;
    } else {
      return convo;
    }
  });
};

export const addSearchedUsersToStore = (state, users) => {
  const currentUsers = {};

  // make table of current users so we can lookup faster
  state.forEach((convo) => {
    currentUsers[convo.otherUser.id] = true;
  });

  const newState = [...state];
  users.forEach((user) => {
    // only create a fake convo if we don't already have a convo with this user
    if (!currentUsers[user.id]) {
      let fakeConvo = { otherUser: user, messages: [] };
      newState.push(fakeConvo);
    }
  });

  return newState;
};

export const addNewConvoToStore = (state, recipientId, message) => {
  return state.map((convo) => {
    if (convo.otherUser.id === recipientId) {
      const newConvo = { ...convo };
      newConvo.id = message.conversationId;
      newConvo.messages.push(message);
      newConvo.latestMessageText = message.text;
      return newConvo;
    } else {
      return convo;
    }
  });
};
