const userService = require('../services/user.service');
const Role = require('../utils/roles');

const getAll = async (req, res, next) => {
    try {
        const users = await userService.getAll();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

const authenticate = async (req, res, next) => {
    try {
        const user = await userService.authenticate(req.body);
        if (user) {
            res.status(200).json({ ...user });
        } else {
            res.status(400).json({ message: 'Username or password is incorrect' });
        }
    } catch (error) {
        next(error);
    }
};

const get = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await userService.getById(id);
        if (user) {
            return res.json(user);
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    } catch (error) {
        next(error);
    }
};

const save = async ({ body }, res, next) => {
    try {
        await userService.save(body);
        res.status(200).json({ message: 'User saved' });
    } catch (error) {
        next(error);
    }
};

const signup = async ({ body }, res, next) => {
    try {
        await userService.save({ ...body, role: Role.Client });
        res.status(200).json({ message: 'Signed up' });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    authenticate,
    get,
    getAll,
    save,
    signup,
};
