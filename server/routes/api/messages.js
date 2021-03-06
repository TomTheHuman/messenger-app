const router = require("express").Router();
const { Conversation, Message, User } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");

// expects {recipientId, text } in body
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    const { recipientId, text, sender } = req.body;

    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers[sender.id]) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});

// expects {message} in body
// returns true if updated successfully
router.patch("/", async (req, res, next) => {
  if (!req.body.conversationId) {
    return res.sendStatus(401);
  }

  let read = Boolean(
    await Message.update(
      { read: true },
      {
        include: [{ model: Conversation }, { model: User }],
        where: {
          conversationId: req.body.conversationId,
          senderId: req.body.otherUser.id,
        },
      }
    ).catch((error) => {
      next(error);
    })
  );
  res.json({ read });
});

module.exports = router;
