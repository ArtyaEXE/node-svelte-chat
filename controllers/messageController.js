const Message = require("../models/Message");

const createMessage = async (req, res) => {
  try {
    const { content } = req.body;
    const senderId = req.user._id;
    const roomId = req.params.roomId;

    const message = new Message({
      content,
      sender: senderId,
      roomId,
    });

    await message.save();
    return res
      .status(200)
      .json({ message: `Сообщение создано пользователем ${message.sender}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

const getMessage = async (req, res) => {
  try {
    const roomId = req.params.roomId;

    const messages = await Message.find({ roomId }).populate(
      "sender",
      "username"
    );
    return res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    return res.status(500).json("Ошибка сервера");
  }
};

module.exports = {
  createMessage,
  getMessage,
};
