const bcrypt = require('bcryptjs');
const jwt =  require('jsonwebtoken');
const User = require('../models/user');

const signIn = async (req, res) => {
    const { email, password } = req.body;
    console.log('Req body ', req.body);
    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) return res.status(404).send({
            error: null, message: 'No user found with this email ID'
        })
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) return res.status(403).send({
            error: null, message: 'Invalid password'
        })
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: '1h' });
        return res.status(200).send({
            error: null,
            message: 'Successfully Signed In!',
            data: existingUser,
            token: token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error: true,
            message: 'Some unknown error happened'
        })
    }
}

const signUp = async (req, res) => {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    console.log('Req body: ', req.body);
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).send({
            error: null,
            message: 'User already exists with this email ID',
        })
        if (password !== confirmPassword) return res.status(400).send({
            error: null,
            message: "Passwords don't match",
        })
        const hashedPassword = await bcrypt.hash(password, 12);
        const name = `${firstName} ${lastName}`;
        console.log('NAME: ', name);
        const result = await User.create({ email, password: hashedPassword, name });
        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: '1h' });
        return res.status(200).send({
            error: null,
            message: 'Successfully Registered to the database!',
            data: result,
            token: token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            error: true,
            message: 'Some unknown error happened'
        })
    }
}

module.exports = {
    signUp,
    signIn
}