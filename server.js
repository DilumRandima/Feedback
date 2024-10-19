const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();  

const app = express();
const PORT = process.env.PORT || 8100;  


app.use(cors());
app.use(express.json());  

// MongoDB Connection
const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("MongoDB connection success!");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);  
});

// Routes
const CustomerRouter = require("./routes/Customers");
app.use("/Customer", CustomerRouter);  

// Start server
app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`);
});
