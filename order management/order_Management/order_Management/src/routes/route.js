const express = require("express")
const router = express.Router()
const {customerRegistration,customerLogin}=require("../controllers/customerController")
const {createOrder,updateOrder}=require("../controllers/orderController")
//=============customer============//
router.post('/createCustomer', customerRegistration)
router.post('/customerLogin', customerLogin)
//====================order========//
router.post('/order', createOrder)
router.put("/order",updateOrder)





router.all('/**', function (req, res) {
    res.status(404).send({
        status: false,
        message: "The api you requested is not available. Make sure your endpoint is correct or not."
    })
})





module.exports = router