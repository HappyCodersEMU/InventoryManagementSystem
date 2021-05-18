const Inventory = require("../models/inventoryProduct");
const Product = require("../models/product");
const Company = require("../models/company");

module.exports = class InventoryService {
    static async getAll() {
        const data = await Inventory.find()
            .select("_id product company quantity")
            .populate("product company")
            .exec()

        return data
    }

    static async getById(id) {
        const data = await Inventory.findById(id)
            .select("_id product company quantity")
            .populate("product company")
            .exec()

        return data
    }


    static async getByCompany(companyId) {
        const data = await Inventory.find({ company: companyId })
            .select("_id product company quantity")
            .populate("product company")
            .exec()

        const result = {
            count: data.length,
            products: data.map((d) => {
                return {
                    inventoryId: d._id,
                    productId: d.product._id,
                    productCode: d.product.productCode,
                    productName: d.product.name,
                    categoryId: d.product.categoryId,
                    subcategoryId: d.product.subcategoryId,
                    // price: d.price,
                    // description: d.description,
                };
            }),
        };

        return result
    }


    // addProduct creates adds a new product to the inventory if it has not beed created before.
    // if the product exist the company inventory, then it will increase its quantity.
    static async addProduct(data) {
        const { productId, companyId, quantity } = data

        // check if company exist
        const company = await Company.findById(companyId)
        if (!company) {
            throw ({ status: 400, message: 'Provided company does exist' });
        }
        // check if product exist
        const product = await Product.findById(productId)
        if (!product) {
            throw ({ status: 400, message: 'Provided product does exist' });
        }

        // if company already has the product, then increase the quantity
        let inventoryProduct = await Inventory.findOne({ company: companyId, product: productId })
        if (inventoryProduct != null) {
            inventoryProduct.quantity += quantity
        } else {
            inventoryProduct = new Inventory({
                product: productId,
                company: companyId,
                quantity
            })
        }

        await inventoryProduct.save()
        return inventoryProduct._id
    }

    // deleteProduct completely deletes the product from inventory.
    // if quantity is passed, then substracts it from the inventory product,
    // otherwise, deletes the product commpletely.
    static async deleteProduct(reqBody) {
        const { productId, companyId, quantity } = reqBody

        // if quantity is passed, then substract it from the inventory product,
        if (quantity != null && typeof (quantity) != 'undefined') {
            let inventoryProduct = await Inventory.findOne({ company: companyId, product: productId })
            if (inventoryProduct != null) {
                if ((inventoryProduct.quantity - quantity) < 0) {
                    throw ({ status: 400, message: 'insufficient amount of products in the inventory' });
                }
                inventoryProduct.quantity -= quantity
            }
            await Inventory.updateOne({ _id: inventoryProduct._id }, { quantity: inventoryProduct.quantity })
        }
        else {
            await Inventory.deleteOne({ company: companyId, product: productId })
        }
    }

    static async updateProductQuantity(companyId, productId, quantity) {
        resp = await Inventory.updateOne({ company: companyId, product: productId, quantity })
        return resp
    }


    static async search(searchQuery, limit) {
        const data = await Inventory.find(searchQuery)
            .select("_id company product quantity")
            .populate('company', '-__v')
            .populate('product', '-__v')
            .limit(limit)
            .exec()

        return data
    }

    static toSearch(args) {
        let searchQuery = {}

        if (args.companyId != null) {
            searchQuery = { ...searchQuery, ...{ company: args.companyId } };
        }
        if (args.productId != null) {
            searchQuery = { ...searchQuery, ...{ product: args.productId } };
        }
        return searchQuery
    }

}