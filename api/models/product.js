const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  price: { type: Number, required: false },
  productImage: { type: String, required: false },
  description: { type: String, default: "" },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  details: { type: Object, default: {} },
});

module.exports = mongoose.model("Product", productSchema);
