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
        console.log(email, name, surname, password)
        if (checkCandidate) {
            return res.status(400).json({message: 'This e-mail already in use'})
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({
            email,
            name,
            surname,
            password
        })

        try {
            await user.save()
        } catch (e) {}
        res.status(201).json({message: 'User has been created'})

    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Something went wrong, try again' })
    }

})


router.post('/testToken', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Post created...',
                authData
            });
        }
    });
});

// /api/auth/login
router.get('/login', (req, res) => {
    // Mock user
    const user = {
        id: 1,
        username: 'Dovud',
        email: 'dinomov@gmail.com'
    }

    jwt.sign({ user }, 'secretkey', { expiresIn: '24h' }, (err, token) => {
        res.json({
            token
        });
    });
})


function verifyToken (req, res, next) {
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.token = bearerToken;
        // Next middleware
        next();
    } else {
        res.sendStatus(403);
    }
}


module.exports = router;
