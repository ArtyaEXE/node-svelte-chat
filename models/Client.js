const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fName: { type: String },
  sName: { type: String },
  lName: { type: String },
  birthDay: { type: Date },
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
