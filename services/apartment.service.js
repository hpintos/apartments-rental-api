const Apartment = require('../models/apartment.model');
const Role = require('../utils/roles');

const getAll = async (role, filters) => {
    try {
        const { size, price, rooms } = filters;
        let condition = role === Role.Client ? { rented: false, ...filters } : { ...filters };
        if (size && !isNaN(size)) condition = { ...condition, size: { $gte: size } };
        if (price && !isNaN(price)) condition = { ...condition, price: { $lte: price } };
        if (rooms && !isNaN(rooms)) condition = { ...condition, rooms: { $gte: rooms } };
        const result = await Apartment.find(condition);
        return result;
    } catch (err) {
        console.error(err.message);
        throw Error(err.message);
    }
};

const getById = async (id) => {
    try {
        return await Apartment.findById(id);
    } catch (err) {
        console.error(err.message);
        throw Error(err.message);
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
        throw Error(err.message);
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
        throw Error(err.message);
    }
};

const remove = async (id) => {
    try {
        return await Apartment.findByIdAndDelete(id);
    } catch (err) {
        console.error(err.message);
        throw Error(err.message);
    }
};

module.exports = { getAll, getById, save, update, remove };
