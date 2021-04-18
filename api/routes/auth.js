const { Router } = require('express')
const router = Router()
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

// /api/auth/register
router.post('/register', async (req, res) => {

    try {
        const {email, name, surname, password} = req.body
        const checkCandidate = await User.findOne({email})
        if (checkCandidate) {
            return res.status(400).json({message: 'This e-mail already in use'})
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({
            email,
            name,
            surname,
            password: hashedPassword
        })

        await user.save()

        res.status(201).json({message: 'User has been created'})

    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Something went wrong, try again' })
    }

})


// /api/auth/login
router.post(
    '/login',
    // [
    //     check('email', 'Enter correct email').normalizeEmail().isEmail(),
    // ],
    async (req, res) => {
        try {
            // const errors = validationResult(req)
            // if (!errors.isEmpty()) {
            //     return res.status(400).json({ errors: errors.array(), message: 'Wrong data'})
            // }
            const {email, password} = req.body
            const user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({ message: "User not found"})
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({ message: "Wrong password, try again" })
            }
            const token = jwt.sign(
                { userId: user.id },
                'jwtSecret',
                { expiresIn: '1h' }
            )

            res.json({ token, userId: user.id })

        } catch (e) {
            res.status(500).json({ message: 'Something went wrong, try again' })
        }
    })



// router.post('/testToken', verifyToken, (req, res) => {
//     jwt.verify(req.token, 'secretkey', (err, authData) => {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//             res.json({
//                 message: 'Post created...',
//                 authData
//             });
//         }
//     });
// });
//
//
// function verifyToken (req, res, next) {
//     const bearerHeader = req.headers['authorization'];
//     // Check if bearer is undefined
//     if (typeof bearerHeader !== 'undefined') {
//         // Split at the space
//         const bearer = bearerHeader.split(' ');
//         // Get token from array
//         const bearerToken = bearer[1];
//         // Set the token
//         req.token = bearerToken;
//         // Next middleware
//         next();
//     } else {
//         res.sendStatus(403);
//     }
// }


module.exports = router;
