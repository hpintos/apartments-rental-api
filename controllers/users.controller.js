const userService = require('../services/user.service');
const Role = require('../utils/roles');

const getAll = async (req, res) => {
    try {
        const users = await userService.getAll();
        res.status(200).json(users);
    } catch (err) {
        console.log(err.message);
        res.status(400).send({ error: 'Unable to get all users' });
    }
};

const authenticate = async (req, res, next) => {
    try {
        const token = await userService.authenticate(req.body);
        if (token) {
            res.status(200).json({ token });
        } else {
            res.status(400).json({ message: 'Username or password is incorrect' });
        }
    } catch (error) {
        next(error);
    }
};

const get = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userService.getById(id);
        if (user) {
            return res.json(user);
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};

const save = async ({ body }, res) => {
    try {
        await userService.save(body);
        res.status(200).json({ message: 'User saved' });
    } catch (err) {
        console.log(err.message);
        res.status(400).send({ error: 'Unable to save: ' + err.message });
    }
};

const signup = async ({ body }, res) => {
    try {
        await userService.save({ ...body, role: Role.Client });
        res.status(200).json({ message: 'Signed up' });
    } catch (err) {
        console.log(err.message);
        res.status(400).send({ error: 'Unable to save: ' + err.message });
    }
};

module.exports = {
    authenticate,
    get,
    getAll,
    save,
    signup,
};
