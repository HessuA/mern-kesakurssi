const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  birthyear: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  stories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Story" }],
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);
