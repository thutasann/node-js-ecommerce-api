const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const cors = require('cors');

// Routes
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("DB Connectin success 🚀 ");
})
.catch((err) => {
    console.log("err", err);
});


const BASE_URL = "/klink-ecom/api/v1";

// ROUTES
app.use(cors());
app.use(express.json());

app.use(`${BASE_URL}/auth`, authRoutes);
app.use(`${BASE_URL}/users`, userRoutes);
app.use(`${BASE_URL}/products`, productRoutes);



app.listen(process.env.PORT || 4000, () => {
    console.log(`KLINK E-com API is running at port ${process.env.PORT}..`);
})