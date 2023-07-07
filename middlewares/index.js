const User = require("../models/User");
const Room = require("../models/Room");

const checkToken = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return res.status(401).json({ error: "Требуется заголовок авторизации" });
    }

    const token = authorizationHeader.replace("Bearer ", "");
    const user = await User.findOne({ token });
    req.user = user;

    if (!user) {
      return res.status(401).json({ error: "Токен не найден" });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

const checkCreator = async (req, res, next) => {
  try {
    const roomId = req.params.roomId;
    const userId = req.user._id;

    const room = await Room.findOne({ _id: roomId, creator: userId });
    req.room = room;

    if (!room) {
      return res
        .status(403)
        .json({ error: "Вы не являетесь создателем комнаты" });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json("Ошибка сервера");
  }
};

module.exports = {
  checkToken,
  checkCreator,
};
