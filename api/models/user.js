const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  password: { type: String, required: true },
  hasCompany: { type: Boolean, required: true, default: false}
});

module.exports = mongoose.model("User", userSchema);
