const User = require("../models/user");
const Company = require('../models/company')

const Product = require("../models/product");
const Subcategory = require("../models/subcategory");


module.exports = class ProductService {

    static async getAll() {
        const data = await Product.find()
            .select("name _id productImage categoryId description") // Select only listed fields
            .exec()

        const result = {
            count: data.length,
            products: data.map((d) => {
                return {
                    _id: d._id,
                    name: d.name,
                    // price: d.price,
                    description: d.description,
                };
            }),
        };

        return result
    }

    static async getById(id) {
        const data = await Product.findById(id)
            .select("name _id productImage categoryId description") // Select only listed fields
            .exec()

        return data
    }

    static async createProduct(data) {
        // TODO: handle details object
        const { name, imageUrl, categoryId, subcategoryId, description } = data

        // check if subcategory is under the valid category
        const validCategory = await Subcategory.find({_id: subcategoryId, categoryId})
        if (!validCategory) {
            throw ({ status: 400, message: 'Provided subcategory does not match category' });
        }
        
        const product = new Product({
            name,
            imageUrl,
            categoryId,
            subcategoryId
        })

        await product.save()
        return product._id
    }
}