const ProductService = require("../services/productSvc");

module.exports = class Product {

    static async getAll(req, res, next) {
        try {
            const data = await ProductService.getAll()
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


    static async getById(req, res, next) {
        try {
            const data = await ProductService.getById(req.params.id)
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
}
