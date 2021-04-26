const AuthService = require("../services/authSvc");
const { check, validationResult } = require('express-validator');

module.exports = class Auth {

    static async register(req, res, next) {
        try {
            const { password, conPassword } = req.body

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array(), message: errors.array()[0].msg })
            }

            if (password !== conPassword) {
                return res.status(400).json({ message: 'Passwords do not match' })
            }

            const createdUser = await AuthService.registerUser(req.body);
            res.status(201).json({ message: 'User has been created', status: 'created', userId: createdUser })

        } catch (e) {
            console.log(e)
            if (!e.status) {
                res.status(500).json({ message: 'Something went wrong, try again' })
            } else {
                res.status(400).json({ message: e.message })
            }
        }
    }


    static async login(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array(), message: errors.array()[0].msg })
            }

            const { token, userId, hasCompany } = await AuthService.login(req.body);
            res.json({ token, userId, hasCompany })

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
            case 'register': {
                return [
                    check('email', 'Wrong email').isEmail(),
                    check('name', 'Enter name').notEmpty(),
                    check('surname', 'Enter surname').notEmpty(),
                    check('password', 'Minimum 6 symbols').isLength({ min: 6 })
                ]
            }
            case 'login': {
                return [
                    check('email', 'Password or email is incorrect').normalizeEmail().isEmail(),
                ]
            }
        }
    }
}
