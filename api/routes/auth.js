const { Router } = require('express')
const router = Router()
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");

const User = require("../models/user");

// /api/auth/register
router.post('/register', (req, res) => {
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    });

    user.save()
        .then((result) => {
            res.status(201).json({
                message: "User created",
                createdUser: {
                    _id: result._id,
                    email: result.email,
                    name: result.name,
                    password: result.password,
                    role: result.role,
                },
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err,
            });
        });
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
