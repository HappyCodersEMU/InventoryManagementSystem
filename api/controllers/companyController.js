const CompanyService = require("../services/companySvc");



module.exports = class Company {

    static async createCompany(req, res, next) {
        try {

            const { message, hasCompany } = await CompanyService.createCompany(req.body);
            res.status(201).json({ message, status: 'created', hasCompany })

        } catch (e) {
            console.log(e)
            if (!e.status) {
                res.status(500).json({ message: 'Something went wrong, try again' })
            } else {
                res.status(400).json({ message: e.message })
            }
        }
    }


    static async getAll(req, res, next) {
        try {

            const data = await CompanyService.getAll()
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
            const data = await CompanyService.getById(req.params.id)
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
