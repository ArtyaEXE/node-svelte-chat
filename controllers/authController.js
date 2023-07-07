const User = require("../models/User");
const Client = require("../models/Client");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

function generateToken() {
  return crypto.randomBytes(32).toString("hex");
}

const signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Пользователь с таким именем сущетсвует" });
    }

    const hashedPassword = await bcrypt.hash(password, 7);

    const user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();

    const client = new Client({
      userId: user._id,
      fName: "",
      sName: "",
      lName: "",
      birthDay: "",
    });

    await client.save();

    return res
      .status(200)
      .json({ message: "Пользователь успешно зарегистрирован" });
  } catch (error) {
    console.error("Ошибка при регистрации:", error);
    return res.status(500).json({ error: "Ошибка сервера" });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Пользователь не найден" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Неверные учетные данные" });
    }

    const token = generateToken();
    user.token.push(token);

    await user.save();

    const client = await Client.findOne({ userId: user._id });

    if (!client) {
      return res.status(404).json({ error: "Данные клиента не найдены" });
    }

    return res.status(200).json({ user, client });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

const logout = async (req, res) => {
  try {
    const user = req.user;
    user.token = undefined;
    await user.save();
    res.status(200).json({ message: "Пользователь вышел из системы" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

module.exports = {
  signup,
  login,
  logout,
};
