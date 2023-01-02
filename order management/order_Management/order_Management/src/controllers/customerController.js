const coustomerModel = require("../model/customerModel")
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const customerModel = require("../model/customerModel");
const orderModel=require("../model/orderModel")
const saltRounds = 10
exports.customerRegistration = async (req, res) => {
    //try {
        let data = req.body

        let { fname, lname, email, password,totalOrders,membership } = data

        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "Please enter some data in request body" })
        // if (Object.keys(rest).length > 0) return res.status(400).send({ status: false, message: "Invalid attribute in request body" })
        if (!fname) return res.status(400).send({ status: false, message: "fname is required" })
        if (!lname) return res.status(400).send({ status: false, message: "lname is required" })
        if (!email) return res.status(400).send({ status: false, message: "email is required" })
        if (!password) return res.status(400).send({ status: false, message: "password is required" })


        let findEmail = await coustomerModel.findOne({ email: email })
        if (findEmail) return res.status(400).send({ status: false, message: "Email already exist" })

        data.password = bcrypt.hashSync(password, saltRounds)




        const creatUser = await coustomerModel.create(data)
        return res.status(201).send({ status: true, message: "customer Created Successfully", data: creatUser })

   // } catch (error) {
        //return res.status(500).send({ status: false, message: error.message })
   // }



}



exports.customerLogin = async function (req, res) {
    try {
        let credentials = req.body
        if (Object.keys(credentials).length == 0) return res.status(400).send({ status: false, message: "Please enter email & password" })
        let { email, password } = credentials
        if (!email) return res.status(400).send({ status: false, message: "email is required" })
        if (!password) return res.status(400).send({ status: false, message: "password is required" })
       

        let customer = await customerModel.findOne({ email: email })
        if (!customer) return res.status(404).send({ status: false, message: "customer not found" })

        bcrypt.compare(password, customer.password, function (err, result) {

            if (result) {
                console.log("It matches!")
                const token = jwt.sign({
                    customerId: customer._id,
                    iat: Math.floor(Date.now() / 1000),  //issue time
                    exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60 //expiry time is 24 hours
                }, "orderManagement")

                let final = { customerId: customer._id, token: token }
                return res.status(200).send({ status: true, message: 'customer login successfully', data: final })
            }
            return res.status(400).send({ status: false, message: "Invalid credentials" })
        });



    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}