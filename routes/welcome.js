const router = require('express').Router();

router.get("/", (req,res) => {
    res.json("WELCOME FROM KLINK ECOMMERCE API");
});

module.exports = router;