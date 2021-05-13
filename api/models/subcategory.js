const mongoose = require("mongoose");

const subcategorySchema = mongoose.Schema({
  // _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  description: { type: String, default: "" },
  imageUrl: { type: String, required: false },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

module.exports = mongoose.model("Subcategory", subcategorySchema);
