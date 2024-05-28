const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    address: [
        {
            name: String,
            locality: String,
            district: String,
            address: String,
            address2: String,
            city: String,
            state: String,
            pincode: Number,
            phonenumber: Number
        }
    ]
});

module.exports = mongoose.model('address', addressSchema);
