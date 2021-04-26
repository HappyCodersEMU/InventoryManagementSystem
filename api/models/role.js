const mongoose = require("mongoose");

const roleSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    roleName: { type: String, required: true, unique: true },
    tempNameFeatureOne: { type: Boolean },
    tempNameFeatureTwo: { type: Boolean },
    tempNameFeatureThree: { type: Boolean },
    tempNameFeatureFour: { type: Boolean },
});

module.exports = mongoose.model("Role", roleSchema);
