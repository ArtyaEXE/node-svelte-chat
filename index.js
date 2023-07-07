const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
const ngrok = require("ngrok");
const path = require("path");
const dotenv = require("dotenv");
const authRoutes = require("./routes/authRoutes");
const roomRoutes = require("./routes/roomRoutes");
const messageRoutes = require("./routes/messageRoutes");
const clientRoutes = require("./routes/clientRoutes");

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://Artur:Artur@cluster0.c89cqv1.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB подключен"))
  .catch((err) => console.log("MongoDB connection error: ", err));

app.use(express.static(path.join(__dirname, "client", "public")));
app.use(cors());
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "public", "index.html"));
});

app.use("/auth", authRoutes);
app.use("/rooms", roomRoutes);
app.use("/messages", messageRoutes);
app.use("/clients", clientRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

app.listen(port, async () => {
  console.log(`Сервер работает на http://localhost:${port}`);

  try {
    const url = await ngrok.connect(port);
    console.log(`Туннель ngrok создан: ${url}`);
    process.env.SERVER_URL = url;
  } catch (error) {
    console.log("Ошибка при создании туннеля ngrok:", error);
  }
});
