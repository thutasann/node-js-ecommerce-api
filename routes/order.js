const { verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyToken } = require('./verifyToken');
const Order = require('../models/Order');


const router = require('express').Router();

// NEW ORDER
router.post("/add-order", verifyTokenAndAuthorization, async(req,res) => {
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (error) {   
        res.status(500).json(error);
    }
});

// UPDATE ORDERS
router.put("/update-order/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        },{
            new: true
        });
        res.status(200).json(updatedOrder);
    } catch (error) {
        res.status(500).json(error);
    }
});


//DELETE ORDER
router.delete('/delete-order/:id', verifyTokenAndAdmin, async(req,res) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been Deleted");
    } catch (error) {
        res.status(500).json(error);
    }
});

// GET USER ORDERS
router.get('/find-order/:userId', verifyTokenAndAuthorization, async(req,res) => {
    try {
        const orders = await Order.find({
            userId: req.params.userId
        });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json(error);
    }
});

//GET ALL ORDERS
router.get("/get-all-orders", verifyTokenAndAdmin, async(req,res) =>{
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json(error);
    }
});


// GET MONTHLY INCOMES
router.get("/income", verifyTokenAndAdmin, async(req,res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        const income = await Order.aggregate([
            { $match: { createdAt: {$gte: previousMonth }}},
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" }
                }
            },
        ]);
        res.status(200).json(income);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;