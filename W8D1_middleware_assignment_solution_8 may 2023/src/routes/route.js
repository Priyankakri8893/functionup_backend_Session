const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const productController = require("../controllers/productController")
const orderController = require("../controllers/orderController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/products", productController.createProduct)
router.post("/users", userController.createUser)
router.post("/orders", orderController.createOrder)

module.exports = router;