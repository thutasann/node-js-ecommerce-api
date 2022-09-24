const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');
const Cart = require('../models/Cart');


const router = require('express').Router();

// NEW CART
router.post("/add-cart", verifyTokenAndAuthorization, async(req,res) => {
    const newCart = new Cart(req.body);

    try {
        const savedCart = await newCart.save();
        res.status(201).json(savedCart);
    } catch (error) {   
        res.status(500).json(error);
    }
})

// UPDATE CART
router.put("/update-cart/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{
            new: true
        });
        res.status(200).json(updatedCart);
    } catch (error) {
        res.status(500).json(error);
    }
});


//DELETE CART
router.delete('/delete-cart/:id', verifyTokenAndAuthorization, async(req,res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been Cleared");
    } catch (error) {
        res.status(500).json(error);
    }
});

// // GET USER CART
router.get('/find-cart/:userId', verifyTokenAndAuthorization, async(req,res) => {
    try {
        const cart = await Cart.findOne({
            userId: req.params.userId
        });
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json(error);
    }
});

//GET ALL CARTS
router.get("/get-all-carts", verifyTokenAndAdmin, async(req,res) =>{
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;