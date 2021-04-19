const mongoose = require("mongoose");

const memberSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        requried: true
    },
    name: { type: String, required: true },
    active: {type: Boolean, default: true},
    companyID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        requried: true
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        enum : ['user','admin'],
        default: 'user'
    },
});

module.exports = mongoose.model("Company", memberSchema);
