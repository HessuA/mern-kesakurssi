const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const storySchema = new Schema({
  date: { type: String, required: true },
  place: { type: String, required: true },
  content: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Story", storySchema);
