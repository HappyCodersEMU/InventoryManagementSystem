const mongoose = require("mongoose");

const subscriptionSchema = mongoose.Schema({
    // _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    transPerMonth: { type: Number, required: true },
    numProducts: { type: Number, required: true },
    numMembers: { type: Number, required: true },
});

module.exports = mongoose.model("Subscription", subscriptionSchema);
