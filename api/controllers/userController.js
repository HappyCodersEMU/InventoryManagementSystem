const UserService = require("../services/userSvc");
const { check, validationResult } = require('express-validator');

module.exports = class User {

    static async getById(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(), message: errors.array()[0].msg
                })
            }

            const data = await UserService.getById(req.params.id)
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

    static async getByEmail(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(), message: errors.array()[0].msg
                })
            }

            const data = await UserService.getByEmail(req.params.email)
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

    // TODO: protect the route.
    static async searchUsers(req, res, next) {
        const defaultLimit = 100
        let limit = 0

        try {
            let searchQuery = {}

            if (req.query.name != null) {
                searchQuery = { ...searchQuery, ...{ name: req.query.name } };
            }
            if (req.query.surname != null) {
                searchQuery = { ...searchQuery, ...{ surname: req.query.surname } };
            }
            if (req.query.hasCompany != null) {
                searchQuery = { ...searchQuery, ...{ hasCompany: req.query.hasCompany } };
            }
            if (req.query.limit != null) {
                limit = parseInt(req.query.limit);
            } else {
                limit = defaultLimit;
            }

            const data = await UserService.search(searchQuery, limit)
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
            case 'getByEmail': {
                return [
                    check('email', 'email cannot be empty').notEmpty().isEmail(),
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
