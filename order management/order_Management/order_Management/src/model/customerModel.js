
const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
        fname: { type: String, required: true ,trim:true},
        lname: { type: String, required: true ,trim:true},
        email: { type: String, required: true, unique:true,trim:true },
        password: { type: String, required: true ,trim:true},
        membership:{type:String,default:"regular",enum:["regular", "gold", "platinum"]},
        totalOrders:{type:Number,default:0}
           
        


}, { timestamps: true })

module.exports = mongoose.model("customer", customerSchema)