const Subcategory = require("../models/subcategory");
const Category = require("../models/category");


module.exports = class CategoryService {
    // Categories

    static async getAllCategories() {
        const data = await Category.find()
            .select("name _id categoryImage description")
            .exec()

        const result = {
            count: data.length,
            categories: data.map((d) => {
                return {
                    _id: d._id,
                    name: d.name,
                    categoryImage: d.categoryImage,
                    description: d.description,
                };
            }),
        };

        return result
    }

    static async getCategoryById(id) {
        const data = await Category.findById(id)
            .select("name _id categoryImage description")
            .exec()

        return data
    }

    static async newCategory(data) {
        // TODO: handle categoryImage
        const { name, description } = data

        const category = new Category({
            name,
            description,
        })

        await category.save()
        return category._id
    }

    // Subcategories

    static async getAllSubcategories() {
        const data = await Subcategory.find()
            .select("name _id subcategoryImage description categoryId")
            .populate("categoryId")
            .exec()

        const result = {
            count: data.length,
            subcategories: data.map((d) => {
                return {
                    _id: d._id,
                    name: d.name,
                    subcategoryImage: d.subcategoryImage,
                    description: d.description,
                    categoryId: d.categoryId,
                };
            }),
        };

        return result
    }

    static async getSubcategoryById(id) {
        const data = await Subcategory.findById(id)
            .select("name _id categoryImage description")
            .populate("categoryId")
            .exec()

        return data
    }

    static async newSubcategory(data) {
        // TODO: handle subcategoryImage
        const { name, description, categoryId } = data

        // check for valid category
        const validCategory = await Category.findOne({ _id: categoryId })
        if (!validCategory) {
            throw ({ status: 400, message: 'Provided category does not exist' });
        }

        const subcategory = new Subcategory({
            name,
            description,
            categoryId,
        })

        await subcategory.save()
        return subcategory._id
    }
}