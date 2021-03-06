const mongoose = require("mongoose");


const companySchema = mongoose.Schema({
  name: { type: String, required: true },
  subscription: { type: mongoose.Schema.Types.ObjectId, ref: 'Subscription', required: true },
});

module.exports = mongoose.model("Company", companySchema);
