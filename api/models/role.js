const mongoose = require("mongoose");

const roleSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    roleName: { type: String, required: true, unique: true },
    tempNameFeature1: { type: Boolean, required: true },
    tempNameFeature2: { type: Boolean, required: true },
    tempNameFeature3: { type: Boolean, required: true },
    tempNameFeature4: { type: Boolean, required: true },
});

module.exports = mongoose.model("Role", roleSchema);
