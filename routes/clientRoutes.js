const express = require("express");
const router = express.Router();
const { checkToken } = require("../middlewares/index");
const clientController = require("../controllers/clientController");

router.post("/update", checkToken, clientController.updateClient);
router.get("/:userId", checkToken, clientController.getClient);

module.exports = router;
