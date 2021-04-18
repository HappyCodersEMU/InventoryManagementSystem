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


// /api/auth/login
router.post('/login', async (req, res) => {

})