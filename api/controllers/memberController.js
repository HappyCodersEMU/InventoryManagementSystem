const MemberService = require("../services/memberSvc");
const { check, validationResult } = require('express-validator');

module.exports = class Memeber {

    static async addMemeber(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(), message: errors.array()[0].msg
                })
            }

            const data = await MemberService.addMember(req.body)
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
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(), message: errors.array()[0].msg
                })
            }

            const data = await MemberService.getById(req.params.id)
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
    static async searchMembers(req, res, next) {
        const defaultLimit = 100
        let limit = 0

        try {
            let searchQuery = {}

            if (req.query.companyId != null) {
                searchQuery = { ...searchQuery, ...{ company: req.query.companyId } };
            }
            if (req.query.userId != null) {
                searchQuery = { ...searchQuery, ...{ user: req.query.userId } };
            }
            if (req.query.active != null) {
                searchQuery = { ...searchQuery, ...{ active: req.query.active } };
                searchQuery.active = req.query.active
            }
            if (req.query.roleId != null) {
                searchQuery = { ...searchQuery, ...{ role: req.query.roleId } };
            }
            if (req.query.limit != null) {
                limit = parseInt(req.query.limit);
            } else {
                limit = defaultLimit;
            }

            const data = await MemberService.search(searchQuery, limit)
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
            case 'addMember': {
                return [
                    // check('userID', 'userID cannot be empty').notEmpty() || check('email', 'email cannot be empty').notEmpty(),
                    check('companyID', 'companyID cannot be empty').notEmpty(),
                    check('roleID', 'roleID cannot be empty').notEmpty(),
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
