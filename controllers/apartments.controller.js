const apartmentService = require('../services/apartment.service');

exports.getAll = async (req, res, next) => {
    try {
        const { role } = req.user;
        const result = await apartmentService.getAll(role, req.query);
        res.status(200).json(result);
    } catch (err) {
        res.status(400).send({ error: 'Unable to get all apartments: ' + err.message });
        // next();
    }
};

exports.get = async (req, res, next) => {
    try {
        const apartment = await apartmentService.getById(req.params.id);
        if (apartment) {
            return res.json(apartment);
        } else {
            res.status(404).send();
        }
    } catch (err) {
        res.status(400).send({ error: 'Unable to get an apartment: ' + err.message });
        // next();
    }
};

exports.save = async ({ body }, res) => {
    try {
        await apartmentService.save(body);
        res.status(200).json({ message: 'Apartment saved' });
    } catch (err) {
        res.status(400).send({ error: 'Unable to save: ' + err.message });
    }
};

exports.update = async (req, res) => {
    try {
        await apartmentService.update(req.params.id, req.body);
        res.status(200).json({ message: 'Apartment updated' });
    } catch (err) {
        res.status(400).send({ error: 'Unable to update: ' + err.message });
    }
};

exports.remove = async (req, res) => {
    try {
        await apartmentService.remove(req.params.id);
        res.status(200).json({ message: 'Apartment removed' });
    } catch (err) {
        res.status(400).send({ error: 'Unable to remove: ' + err.message });
    }
};
