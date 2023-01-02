const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const orderSchema = new mongoose.Schema({
  coustmerId : {type : ObjectId, ref :"customer",required : true, trim : true},
  productName : {type :[String], required:true},
  quantity : {type: Number, default : 1}

})


module.exports = mongoose.model("Order", orderSchema);