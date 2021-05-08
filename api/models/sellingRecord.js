const mongoose = require("mongoose");

const typeId = mongoose.Schema.Types.ObjectId

const sellingRecordSchema = mongoose.Schema({
    _id: typeId,
    inventoryProductId: { type: typeId, required: true, ref="InventoryProduct" },
    memberId: { type: typeId, required: true },
    quantity: { type: String },
    price: { type: Number, required: true },
});

module.exports = mongoose.model("SellingRecord", sellingRecordSchema);
