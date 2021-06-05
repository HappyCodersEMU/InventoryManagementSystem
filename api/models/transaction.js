const mongoose = require("mongoose");

const typeId = mongoose.Schema.Types.ObjectId

const transactionSchema = mongoose.Schema({
    // inventoryProductId (FK)
    inventoryProduct: { type: typeId, required: true, ref:"InventoryProduct" },
  
    // memberId (FK)
    // member: { type: typeId, required: true, ref:"Member" },
    
    // companyId (FK)
    company: { type: typeId, required: true, ref:"Company" },
    quantity: { type: Number, default: 1 },
    price: { type: Number, required: true },
    transactionType: {
        type: String,
        enum: ['SELL', 'BUY'],
        default: 'SELL'
    },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transaction", transactionSchema);
