const router = require("express").Router();
let Customer = require("../models/Customer");

// Route to add a new customer
// POST http://localhost:8100/Customer/add
router.route("/add").post((req, res) => {
    const { name, phone_number, email, message, employee_name } = req.body;

    // Validate that required fields are present
    if (!name || !phone_number || !email || !message || !employee_name) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const newCustomer = new Customer({
        name,
        phone_number,
        email,
        message,
        employee_name
    });

    newCustomer.save()
        .then(() => {
            res.status(201).json({ message: "Customer Added" });
        })
        .catch((err) => {
            console.error("Error saving customer:", err);  // Log the actual error
            res.status(500).json({ error: "Failed to add customer", details: err.message });  // Send detailed error message
        });
});

// Route to get all customers
// GET http://localhost:8100/Customer/
router.route("/").get((req, res) => {
    Customer.find()
        .then((customers) => {
            res.status(200).json(customers);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ error: "Failed to retrieve customers" });
        });
});

// Route to update a customer by ID
// PUT http://localhost:8100/Customer/update/:id
router.route("/update/:id").put(async (req, res) => {
    const CustomerId = req.params.id;
    const { name, phone_number, email, message, employee_name } = req.body;

    const updateCustomer = { name, phone_number, email, message, employee_name };

    await Customer.findByIdAndUpdate(CustomerId, updateCustomer, { new: true }) // { new: true } returns the updated document
        .then((updatedCustomer) => {
            if (!updatedCustomer) {
                return res.status(404).send({ status: "Customer not found" });
            }
            res.status(200).send({ status: "Customer updated", updatedCustomer });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error updating customer", error: err.message });
        });
});

// Route to delete a customer by ID
// DELETE http://localhost:8100/Customer/delete/:id
router.route("/delete/:id").delete(async (req, res) => {
    const CustomerId = req.params.id;

    await Customer.findByIdAndDelete(CustomerId)
        .then((deletedCustomer) => {
            if (!deletedCustomer) {
                return res.status(404).send({ status: "Customer not found" });
            }
            res.status(200).send({ status: "Customer deleted" });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error deleting customer", error: err.message });
        });
});

// Route to get a customer by ID
// GET http://localhost:8100/Customer/get/:id
router.route("/get/:id").get(async (req, res) => {
    const CustomerId = req.params.id;

    await Customer.findById(CustomerId)
        .then((customer) => {
            if (!customer) {
                return res.status(404).send({ status: "Customer not found" });
            }
            res.status(200).send({ status: "Customer fetched", customer });
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error fetching customer", error: err.message });
        });
});

module.exports = router;
