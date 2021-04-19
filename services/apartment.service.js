const Apartment = require('../models/apartment.model');
const Role = require('../utils/roles');

const getAll = async (role) => {
    try {
        const condition = role === Role.Client ? { rented: false } : {};
        const result = await Apartment.find(condition);
        return result;
    } catch (err) {
        console.error(err.message);
        throw Error({ error: 'Unable to get all apartments' });
    }
};

const getById = async (id) => {
    try {
        return await Apartment.findById(id);
    } catch (err) {
        console.error(err.message);
        throw Error({ error: 'Unable to get an apartment' });
    }
};

const save = async ({ name, description, area, price, rooms, realtorId }) => {
    try {
        const newApartment = new Apartment({
            name,
            description,
            area,
            price,
            rooms,
            realtor: realtorId,
        });
        return await newApartment.save();
    } catch (err) {
        console.error(err.message);
        throw Error({ error: 'Unable to save: ' + err.message });
    }
};

const update = async (id, { name, description, area, price, rooms, realtorId, rented }) => {
    try {
        return await Apartment.findByIdAndUpdate(id, {
            name,
            description,
            area,
            price,
            rooms,
            rented,
            realtor: realtorId,
        });
    } catch (err) {
        console.error(err.message);
        throw Error({ error: 'Unable to update: ' + err.message });
    }
};

const remove = async (id) => {
    try {
        return await Apartment.findByIdAndDelete(id);
    } catch (err) {
        console.error(err.message);
        throw Error({ error: 'Unable to delete: ' + err.message });
    }
};

module.exports = { getAll, getById, save, update, remove };
