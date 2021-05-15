const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  productCode: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  // price: { type: Number, required: false },
  imageUrl: { type: String, required: false },
  description: { type: String, default: "" },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  subcategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subcategory",
    required: true,
  },

  // TODO: handle details object
  // details: { type: Object, default: {} },
});

module.exports = mongoose.model("Product", productSchema);
