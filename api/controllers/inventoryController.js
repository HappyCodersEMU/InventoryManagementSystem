const InventoryService = require("../services/inventorySvc");
const { check, validationResult } = require('express-validator');

module.exports = class Inventory {

    static async getById(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(), message: errors.array()[0].msg
                })
            }

            const data = await InventoryService.getById(req.params.id)
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


    // addProduct creates adds a new product to the inventory if it has not beed created before.
    // if the product exist the company inventory, then it will increase its quantity. 
    static async addProduct(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(), message: errors.array()[0].msg
                })
            }

            const addedProduct = await InventoryService.addProduct(req.body);
            res.status(201).json({
                message: 'Product has been added', status: 'added', addedProduct
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

    // createProduct creates a new product to the inventory if it has not beed created before.
    // if the product exist in the company inventory, then its quantity will be increased. 
    static async createProduct(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(), message: errors.array()[0].msg
                })
            }

            const inventoryProductId = await InventoryService.createProduct(req.body);
            res.status(201).json({
                message: 'Product has been added', status: 'created', inventoryProductId
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

    // deleteProduct completely deletes the product from inventory.
    // if quantity is passed, then substracts it from the inventory product,
    // otherwise, deletes the product commpletely.
    static async deleteProduct(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(), message: errors.array()[0].msg
                })
            }

            await InventoryService.deleteProduct(req.body);
            res.status(201).json({
                message: 'product has been removed from the inventory', status: 'deleted'
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


    // TODO: protect the route.
    static async searchInventory(req, res, next) {
        const defaultLimit = 100
        let limit = 0

        try {
            const searchQuery = InventoryService.toSearch(req.query)

            if (req.query.limit != null) {
                limit = parseInt(req.query.limit);
            } else {
                limit = defaultLimit;
            }

            const data = await InventoryService.search(searchQuery, limit)
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

    // addProduct creates adds a new product to the inventory if it has not beed created before.
    // if the product exist the company inventory, then it will increase its quantity. 
    static async sellProducts(req, res, next) {
        try {
            await InventoryService.sellProducts(req.body, req.params.companyId);
            res.status(201).json({
                message: 'Successful transaction', status: 'success'
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
            case 'getById': {
                return [
                    check('id', 'id is empty or invalid').notEmpty().isMongoId()
                ]
            }
            case 'addProduct': {
                return [
                    check('productId', 'productId is empty or invalid').notEmpty().isMongoId(),
                    check('companyId', 'companyId is empty or invalid').notEmpty().isMongoId(),
                ]
            }
            case 'createProduct': {
                return [
                    check('productCode', 'productCode is empty or invalid').notEmpty(),
                    check('companyId', 'companyId is empty or invalid').notEmpty().isMongoId(),
                    check('quantity', 'quantity is empty or invalid').notEmpty().isNumeric(),
                    check('name', 'name is empty or invalid').notEmpty(),
                    check('categoryId', 'categoryId is empty or invalid').notEmpty().isMongoId(),
                    check('subcategoryId', 'subcategoryId is empty or invalid').notEmpty().isMongoId(),
                    check('price', 'price is empty or invalid').notEmpty().isNumeric(),
                ]
            }
            case 'deleteProduct': {
                return [
                    check('productId', 'productId is empty or invalid').notEmpty().isMongoId(),
                    check('companyId', 'companyId is empty or invalid').notEmpty().isMongoId(),
                ]
            }
            case 'sellProducts': {
                return [
                    param('companyId', 'companyId query parameter is empty or invalid').notEmpty().isMongoId(),
                ]
            }
        }
    }
}
