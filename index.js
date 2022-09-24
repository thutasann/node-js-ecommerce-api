const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require('dotenv');
const cors = require('cors');

// Routes
const welcomeRoutes = require("./routes/welcome");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");
const stripeRoutes = require("./routes/stripe");

dotenv.config();

// MONGODB Connection
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("DB Connectin success 🚀 ");
})
.catch((err) => {
    console.log("err", err);
});

// ROUTES
app.use(cors());
app.use(express.json());
const BASE_URL = "/klink-ecom/api/v1";

app.use(`${BASE_URL}/`, welcomeRoutes);
app.use(`${BASE_URL}/auth`, authRoutes);
app.use(`${BASE_URL}/users`, userRoutes);
app.use(`${BASE_URL}/products`, productRoutes);
app.use(`${BASE_URL}/carts`, cartRoutes);
app.use(`${BASE_URL}/orders`, orderRoutes);
app.use(`${BASE_URL}/checkout`, stripeRoutes);


// Running Port
app.listen(process.env.PORT || 4000, () => {
    console.log(`KLINK E-com API is running at port ${process.env.PORT}..`);
});