const Room = require("../models/Room");
const Message = require("../models/Message");

const createRoom = async (req, res) => {
  try {
    const { name } = req.body;
    const creator = req.user._id;

    const room = new Room({ name, creator });
    await room.save();

    res.status(201).json({ room });
  } catch (error) {
    console.error("Failed to create room:", error);
    res.sendStatus(500);
  }
};

const deleteRoom = async (req, res) => {
  try {
    const room = req.room;
    await Message.deleteMany({ roomId: room._id });
    await room.deleteOne();

    res.status(200).json({ message: `Комната ${room.name} удалена` });
  } catch (error) {
    console.error("Failed to delete room:", error);
    res.status(500).json("Ошибка сервера");
  }
};

const getRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate("creator", "username");

    return res.status(200).json(rooms);
  } catch (error) {
    console.error("Failed to get rooms:", error);
    res.status(500).json("Ошибка сервера");
  }
};

module.exports = {
  createRoom,
  deleteRoom,
  getRooms,
};
