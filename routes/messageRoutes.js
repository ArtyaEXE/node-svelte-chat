const express = require("express");
const router = express.Router();
const { checkToken } = require("../middlewares/index");
const messageController = require("../controllers/messageController");

router.post("/create/:roomId", checkToken, messageController.createMessage);
router.get("/get/:roomId", checkToken, messageController.getMessage);

module.exports = router;
