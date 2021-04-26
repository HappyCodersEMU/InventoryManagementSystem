const CompanyService = require("../services/companySvc");
const { check, validationResult } = require('express-validator');



module.exports = class Company {

    static async createCompany(req, res, next) {
        try {

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array(), message: errors.array()[0].msg })
            }

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


    static async getById(req, res, next) {
        try {

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array(), message: errors.array()[0].msg })
            }

            const data = await CompanyService.getById(req.params.id)
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


    /**
    * validates the passed fields.
    * @param {string} method - The method name to be validated.
    */
    static validate(method) {
        switch (method) {
            case 'createCompany': {
                return [
                    check('companyName', 'Company name cannot be empty').notEmpty(),
                    check('planName', 'Plan name cannot be empty').notEmpty(),
                    check('userId', 'user id cannot be empty').notEmpty().isMongoId()
                ]
            }
            case 'getById': {
                return [
                    check('id', 'id is empty or invalid').notEmpty().isMongoId()
                ]
            }
        }
    }
}
