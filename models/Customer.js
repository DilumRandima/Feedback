const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone_number: {
        type: String, // Changed to String to avoid issues with large numbers
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    employee_name: {
        type: String,
        required: true
    }
});

// Fixed typo in module.exports
const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;  // Corrected export statement
