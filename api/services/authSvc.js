const User = require("../models/user");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = class AuthService {

    /**
      * Registers a new user.
      * Membership is not handled at this stage.
      */
    static async registerUser(data) {
        const { email, name, surname, password } = data

        const checkCandidate = await User.findOne({ email })
        if (checkCandidate) {
            throw ({ status: 400, message: 'This e-mail already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({
            email,
            name,
            surname,
            password: hashedPassword
        })

        await user.save()
        return user._id
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
            { userId: user.id },
            'jwtSecret', // TODO: update by env constant
            { expiresIn: '1h' }
        )

        return { token, userId: user.id, hasCompany: user.hasCompany }
    }
}