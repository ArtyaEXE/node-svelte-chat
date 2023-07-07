const express = require("express");
const router = express.Router();
const roomController = require("../controllers/roomController");
const { checkToken, checkCreator } = require("../middlewares/index");

router.post("/create", checkToken, roomController.createRoom);
router.delete(
  "/delete/:roomId",
  checkToken,
  checkCreator,
  roomController.deleteRoom
);
router.get("/collection", checkToken, roomController.getRooms);

module.exports = router;
