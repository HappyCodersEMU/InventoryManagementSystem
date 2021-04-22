const mongoose = require("mongoose");

const memberSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    // name: { type: String, required: true },
    active: {type: Boolean, default: true},
    companyID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true
    },
    roleID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        required: true
        // enum : ['user','admin'],
        // default: 'user'
    },
});

module.exports = mongoose.model("Member", memberSchema);
