const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv');

// Routes
const userRoutes = require("./routes/user");

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("DB Connectin success 🚀 ");
})
.catch((err) => {
    console.log("err", err);
});


// ROUTES
app.use(express.json());
const BASE_URL = "/klink-ecom/api/v1";

// User routes
app.use(`${BASE_URL}/users`, userRoutes);



app.listen(process.env.PORT || 4000, () => {
    console.log(`KLINK E-com API is running at port ${process.env.PORT}..`);
})