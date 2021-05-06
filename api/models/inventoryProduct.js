const mongoose = require("mongoose");

const inventoryProductSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  productId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product"},
  companyId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Company" },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Storage" },
  quantity: { type: Number, required: true },
});

module.exports = mongoose.model("InventoryProduct", inventoryProductSchema);
