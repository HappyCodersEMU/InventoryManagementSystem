const CategoryService = require("../services/categorySvc");
const { check, validationResult } = require('express-validator');

module.exports = class Product {

    static async getAllCategories(req, res, next) {
        try {
            const data = await CategoryService.getAllCategories()
            res.status(200).json(data)

        } catch (e) {
            console.log(e)
            if (!e.status) {
                res.status(500).json({ message: 'Something went wrong, try again' })
            } else {
                res.status(400).json({ message: e.message })
            }
        }
    }

    static async getCategoryById(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(), message: errors.array()[0].msg
                })
            }

            const data = await CategoryService.getCategoryById(req.params.id)
            res.status(201).json(data)

        } catch (e) {
            console.log(e)
            if (!e.status) {
                res.status(500).json({ message: 'Something went wrong, try again' })
            } else {
                res.status(400).json({ message: e.message })
            }
        }
    }

    static async createCategory(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(), message: errors.array()[0].msg
                })
            }

            const createdCategory = await CategoryService.newCategory(req.body);
            res.status(201).json({
                message: 'Category has been created', status: 'created', categoryId: createdCategory
            })

        } catch (e) {
            console.log(e)
            if (!e.status) {
                res.status(500).json({ message: 'Something went wrong, try again' })
            } else {
                res.status(400).json({ message: e.message })
            }
        }
    }

    // Subcategories

    static async getAllSubcategories(req, res, next) {
        try {
            const data = await CategoryService.getAllSubcategories()
            res.status(200).json(data)

        } catch (e) {
            console.log(e)
            if (!e.status) {
                res.status(500).json({ message: 'Something went wrong, try again' })
            } else {
                res.status(400).json({ message: e.message })
            }
        }
    }

    static async getSubcategoryById(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(), message: errors.array()[0].msg
                })
            }

            const data = await CategoryService.getSubcategoryById(req.params.id)
            res.status(201).json(data)

        } catch (e) {
            console.log(e)
            if (!e.status) {
                res.status(500).json({ message: 'Something went wrong, try again' })
            } else {
                res.status(400).json({ message: e.message })
            }
        }
    }

    static async createSubcategory(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(), message: errors.array()[0].msg
                })
            }

            const createdSubcategory = await CategoryService.newSubcategory(req.body);
            res.status(201).json({
                message: 'Subcategory has been created', status: 'created', subcategoryId: createdSubcategory
            })

        } catch (e) {
            console.log(e)
            if (!e.status) {
                res.status(500).json({ message: 'Something went wrong, try again' })
            } else {
                res.status(400).json({ message: e.message })
            }
        }
    }


    /**
    * validates the passed fields.
    * @param {string} method - The method name to be validated.
    */
    static validate(method) {
        switch (method) {
            case 'getCategoryById': {
                return [
                    check('id', 'id is empty or invalid').notEmpty().isMongoId()
                ]
            }
            case 'createCategory': {
                return [
                    check('name', 'name is empty or invalid').notEmpty().isString(),
                ]
            }
            case 'getSubcategoryById': {
                return [
                    check('id', 'id is empty or invalid').notEmpty().isMongoId()
                ]
            }
            case 'createSubcategory': {
                return [
                    check('name', 'name is empty or invalid').notEmpty().isString(),
                    check('categoryId', 'categoryId is empty or invalid').notEmpty().isMongoId(),
                ]
            }
        }
    }
}
