const mongoose = require("mongoose");

const memberSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    active: { type: Boolean, default: true },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        required: true
        // default: 'user'
    },
});

module.exports = mongoose.model("Member", memberSchema);
