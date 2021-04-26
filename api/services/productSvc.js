const User = require("../models/user");
const Company = require('../models/company')

const Product = require("../models/product");


module.exports = class ProductService {

    static async getAll() {
        const data = await Product.find()
            .select("name price _id productImage categoryId description") // Select only listed fields
            .exec()

        const result = {
            count: data.length,
            products: data.map((d) => {
                return {
                    _id: d._id,
                    name: d.name,
                    price: d.price,
                    description: d.description,
                };
            }),
        };

        return result
    }

    static async getById(id) {
        const data = await Product.findById(id)
            .select("name price _id productImage categoryId description") // Select only listed fields
            .exec()

        return data
    }
}