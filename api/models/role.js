const mongoose = require("mongoose");

const roleSchema = mongoose.Schema({
    roleCode: { type: Number, required: true, unique: true },
    roleName: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Role", roleSchema);
