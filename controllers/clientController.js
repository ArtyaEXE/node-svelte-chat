const Client = require("../models/Client");

const updateClient = async (req, res) => {
  try {
    const { fName, sName, lName, birthDay } = req.body;

    await Client.findOneAndUpdate(
      { userId: req.user._id },
      { fName, sName, lName, birthDay },
      { new: true }
    );

    return res.status(200).json({ message: "Данные успешно обновлены" });
  } catch (error) {
    console.error("Ошибка при обновлении данных клиента:", error);
    return res.status(500).json({ error: "Ошибка сервера" });
  }
};

const getClient = async (req, res) => {
  try {
    const userId = req.params.userId;
    const client = await Client.findOne({ userId });

    if (!client) {
      return res.status(404).json({ error: "Клиент не найден" });
    }

    return res.status(200).json({ client });
  } catch (error) {
    console.error("Ошибка при получении данных клиента:", error);
    return res.status(500).json({ error: "Ошибка сервера" });
  }
};

module.exports = {
  updateClient,
  getClient,
};
