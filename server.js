const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();  // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 8100;  // Use PORT from environment, fallback to 8100

// Middleware
app.use(cors());
app.use(express.json());  // Body parser middleware for handling JSON requests

// MongoDB Connection
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connection success!");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);  // Exit the process if MongoDB connection fails
});

// Routes
const CustomerRouter = require("./routes/Customers");
app.use("/Customer", CustomerRouter);  // Use the customer routes defined in ./routes/Customers.js

// Start server
app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
});
