const Transaction = require("../models/transaction");

module.exports = class TransactionService {

    static async search(searchQuery, limit) {
        const data = await Transaction.find(searchQuery)
            .select("_id inventoryProduct company quantity price transactionType date")
            .populate('company', '-__v')
            .populate({
                path: 'inventoryProduct',
                populate: {
                    path: 'product',
                    model: 'Product'
                }
            })
            .limit(limit)
            .exec()

        const result = data.map((d) => {
            let date = new Date(d.date)
            return {
                inventoryId: d._id,
                productId: d.inventoryProduct.product._id,
                productCode: d.inventoryProduct.product.productCode,
                productName: d.inventoryProduct.product.name,
                quantity: d.quantity,
                company: {
                    id: d.company._id,
                    name: d.company.name
                },
                price: d.price,
                date: date
            };
        })



        return result
    }


    static toSearch(args) {
        const defaultSearchLimit = 100

        let searchQuery = {}

        if (args.companyId != null) {
            searchQuery = { ...searchQuery, ...{ company: args.companyId } };
        }
        if (args.inventoryProductId != null) {
            searchQuery = { ...searchQuery, ...{ inventoryProductId: args.inventoryProductId } };
        }
        if (args.transactionType != null) {
            searchQuery = { ...searchQuery, ...{ transactionType: args.transactionType } };
        }

        return searchQuery
    }

}