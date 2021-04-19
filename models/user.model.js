const { Schema, model } = require('mongoose');
const ROLE = require('../utils/roles');

const userSchema = new Schema(
    {
        email: { type: String, required: true, maxLength: 50, index: true, unique: true },
        password: { type: String, required: true },
        role: {
            type: String,
            required: true,
            enum: [ROLE.Admin, ROLE.Realtor, ROLE.Client],
        },
    },
    {
        toJSON: {
            transform: (document, returnedObj) => {
                returnedObj.id = returnedObj._id;
                delete returnedObj.__v;
                delete returnedObj._id;
            },
        },
    }
);

const User = model('User', userSchema);

module.exports = User;
