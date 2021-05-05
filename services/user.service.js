const { hashPassword, comparePassword } = require('../utils/encryption');
const User = require('../models/user.model');

const jwt = require('jsonwebtoken');

async function authenticate({ email, password }) {
    const user = await User.findOne({ email });
    const isValidPassword = await comparePassword(password, user.password);
    if (user && isValidPassword) {
        const token = jwt.sign(
            { sub: user.id, email: user.email, role: user.role },
            process.env.SECRET
        );
        return {
            id: user.id,
            email: user.email,
            role: user.role,
            token,
        };
    }
}

async function save({ email, password, passwordConfirm, role }) {
    try {
        if (password !== passwordConfirm) {
            throw Error('Password confirmation does not match');
        }
        const hashedPassword = await hashPassword(password);
        const newUser = new User({
            email,
            password: hashedPassword,
            role,
        });
        return await newUser.save();
    } catch (err) {
        throw Error('Unable to save user. ' + err.message);
    }
}

async function getAll() {
    try {
        return await User.find({}, 'email role');
    } catch (err) {
        throw Error('Unable to get all users');
    }
}

async function getById(id) {
    try {
        const user = await User.findById(id);
        return user;
    } catch (err) {
        throw Error('Unable to get an user. ' + err);
    }
}

module.exports = {
    authenticate,
    getAll,
    getById,
    save,
};
