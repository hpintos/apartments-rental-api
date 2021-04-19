const { Schema, model } = require('mongoose');

const apartmentSchema = new Schema(
    {
        name: { type: String, required: true, maxLength: 50 },
        description: { type: String, required: true, maxLength: 250 },
        area: { type: Number, required: true, min: 0 },
        price: { type: Number, required: true, min: 0 },
        rooms: { type: Number, required: true, min: 0 },
        // geolocation: Geolocation,
        dateAdded: { type: Date, required: true, default: new Date() },
        realtor: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        rented: { type: Boolean, default: false },
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

const Apartment = model('Apartment', apartmentSchema);

module.exports = Apartment;
