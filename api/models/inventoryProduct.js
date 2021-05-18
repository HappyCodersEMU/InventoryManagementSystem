const mongoose = require("mongoose");

const inventoryProductSchema = mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" },
  company: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Company" },
  quantity: { type: Number },
  // storageId: { type: mongoose.Schema.Types.ObjectId, ref: "Storage" },
});

module.exports = mongoose.model("InventoryProduct", inventoryProductSchema);
