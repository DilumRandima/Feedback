const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    name: {
        type: String,
        required: true 
    
    },
    customer_country: {
        type: String,
        require: true
    },
    phone_number: {
        type: String, 
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


const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;  
