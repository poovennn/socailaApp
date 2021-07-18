const router = require("express").Router();
const Conversations = require("../models/Conversation");

//create conversation

router.post("/", async (req, res) => {
  const newConversations = new Conversations({
    members: [req.body.senderId, req.body.recieverId],
  });

  try {
    const savedConversations = await newConversations.save();
    res.status(200).json(savedConversations);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conversation

router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversations.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
