const User = require("../models/user");
const Company = require('../models/company')

const Product = require("../models/product");
const Subcategory = require("../models/subcategory");


module.exports = class ProductService {

    static async getAll() {
        const data = await Product.find()
            .select("productCode name _id productImage category subcategory description") // Select only listed fields
            .populate("category subcategory")
            .exec()

        const result = {
            count: data.length,
            products: data.map((d) => {
                return {
                    _id: d._id,
                    productCode: d.productCode,
                    name: d.name,
                    category: d.category,
                    subcategory: d.subcategory,
                    // price: d.price,
                    // description: d.description,
                };
            }),
        };

        return result
    }

    static async getById(id) {
        const data = await Product.findById(id)
            .select("name _id productImage category description") // Select only listed fields
            .exec()

        return data
    }

    static async createProduct(data) {
        // TODO: handle details object
        const { productCode, name, imageUrl, categoryId, subcategoryId, description } = data

        // check if subcategory is under the valid category
        const validCategory = await Subcategory.find({ _id: subcategoryId, category: categoryId })
        if (!validCategory) {
            throw ({ status: 400, message: 'Provided subcategory does not match category' });
        }

        const product = new Product({
            productCode,
            name,
            imageUrl,
            category: categoryId,
            subcategory: subcategoryId
        })

        await product.save()
        return product._id
    }
}