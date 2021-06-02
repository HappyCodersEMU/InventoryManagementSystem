const Inventory = require("../models/inventoryProduct");
const Product = require("../models/product");
const Company = require("../models/company");
const Category = require("../models/category");
const Subcategory = require("../models/subcategory");

const productSvc = require("../services/productSvc");


module.exports = class InventoryService {

    static async getById(id) {
        const data = await Inventory.findById(id)
            .select("_id product company quantity")
            .populate("product company")
            .exec()

        return data
    }

    // addProduct adds a new product to the inventory if it has not beed added before.
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

    // addProduct adds a new product to the inventory if it has not beed added before.
    // if the product exist the company inventory, then it will increase its quantity.
    static async createProduct(data) {
        const {
            companyId, quantity,
            productCode, name, imageUrl, categoryId, subcategoryId, description
        } = data

        const createProductPayload = { productCode, name, imageUrl, categoryId, subcategoryId, description }

        // check if company exist
        const company = await Company.findById(companyId)
        if (!company) {
            throw ({ status: 400, message: 'Provided company does exist' });
        }

        let productId
        // check if the product with passed product code already exists
        const existProduct = await Product.findOne({ productCode })
        if (existProduct) {
            productId = existProduct._id
        } else {
            // create the product
            const product = await productSvc.createProduct(createProductPayload)
            productId = product._id
        }

        // add the created product to the inventory
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

        const subcategories = await Subcategory.find().select("_id name").exec()
        const categories = await Category.find().select("_id name").exec()
        const result = {
            count: data.length,
            products: data.map((d) => {

                let category = categories.find(cat => cat._id.equals(d.product.category))
                let subcategory = subcategories.find(sub => sub._id.equals(d.product.subcategory))

                console.log(category)

                return {
                    inventoryId: d._id,
                    productId: d.product._id,
                    productCode: d.product.productCode,
                    productName: d.product.name,
                    category: {
                        id: category._id,
                        name: category.name,
                    },
                    subcategory: {
                        id: subcategory._id,
                        name: subcategory.name
                    },
                    quantity: d.quantity,
                    company: {
                        id: d.company._id,
                        name: d.company.name
                    },

                    // price: d.price,
                    // description: d.description,
                };
            }),
        }


        return result
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