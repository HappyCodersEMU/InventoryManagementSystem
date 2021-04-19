const mongoose = require("mongoose");


const companySchema = mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  subscriptionID: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription', required: true },
});

module.exports = mongoose.model("Company", companySchema);
