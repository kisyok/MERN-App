const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

// login
const loginUser = async (req, res) => {
    res.json({ mg: "login user" })
}

// signup
const signupUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.signup(email, password)
        // create token
        const token = createToken(user._id)
        res.status(200).json({ email, token })
    } catch (err) {
        res.status(400).json({ err: err.message})
    }
}

const createToken = (_id) => {
    return jwt.sign({ _id}, process.env.SECRET, { expiresIn: '3d' })
}

module.exports = {
    loginUser,
    signupUser
}