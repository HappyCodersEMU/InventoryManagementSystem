const mongoose = require("mongoose");

// TODO: remove product table and instead use only inventory table
const inventoryProductSchema = mongoose.Schema({
  // productId (FK)
  product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" },
  // companyId (FK)
  company: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Company" },
  
  // supplierId (FK)
  // supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" },// TODO: required: true
  
  quantity: { type: Number, default: 0 },
  price: { type: Number, required: true, default: 1 }, // TODO: required: true

});

module.exports = mongoose.model("InventoryProduct", inventoryProductSchema);
