const User = require("../models/user");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mailSvc = require('./mailSvc')
require("dotenv").config();

module.exports = class AuthService {

    /**
      * Registers a new user.
      * Membership is not handled at this stage.
      */
    static async registerUser(data) {
        try {

            const { email, name, surname, password } = data
            const redirectUrl = 'http://localhost:3000/login'


            const checkCandidate = await User.findOne({ email })
            if (checkCandidate) {
                throw ({ status: 400, message: 'This e-mail already in use' });
            }

            const token = jwt.sign({ email: email }, process.env.JWT_SECRET);

            const hashedPassword = await bcrypt.hash(password, 12)
            const user = new User({
                email,
                name,
                surname,
                password: hashedPassword,
                confirmationCode: token
            })

            await mailSvc.sendConfirmationEmail(name, email, token, redirectUrl)

            await user.save()
            return {
                userId: user._id,
                message: "User was registered successfully! Please check your email",
            }
        } catch (e) {
            throw e
        }
    }

    // ----------------------------------------------------------------------

    static async login(data) {
        const { email, password } = data

        const user = await User.findOne({ email })
        if (!user) {
            throw ({ status: 400, message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            throw ({ status: 400, message: 'Password or email is incorrect' });
        }
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        return { token, userId: user.id, hasCompany: user.hasCompany, status: user.status }
    }



    static async verifyUser(confirmationCode) {
        const user = await User.findOne({ confirmationCode })
        if (!user) {
            throw ({ status: 400, message: 'invalid confirmation code' });
        }

        user.status = "active";
        user.save()

        return true
    }
}