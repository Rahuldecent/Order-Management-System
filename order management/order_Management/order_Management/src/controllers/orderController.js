const OrderModel = require("../model/orderModel");
const customerModel = require("../model/customerModel");
exports.createOrder = async (req, res) => {
    let data = req.body;
    let { coustmerId, productName, quantity } = data;


    const customerFind = await customerModel.findOne({ coustmerId: coustmerId })
    console.log(customerFind.totalOrders + 1)
    const OrderCreated = await OrderModel.create(data)
    console.log(OrderCreated.productName.length)
    if (OrderCreated.productName.length == 10) {
        let m = await customerModel.findOneAndUpdate({ coustmerId: coustmerId }, { $set: { totalOrders: customerFind.totalOrders + OrderCreated.productName.length }, membership: "Gold" })
        console.log(m)

    } else if (OrderCreated.productName.length == 20) {
        await customerModel.findOneAndUpdate({ coustmerId: coustmerId }, { $set: { totalOrders: customerFind.totalOrders + OrderCreated.productName.length }, membership: "platinum" })

    } else {
        await customerModel.findOneAndUpdate({ coustmerId: coustmerId }, { $set: { totalOrders: customerFind.totalOrders + OrderCreated.productName.length }, membership: "regular" })
        return res.status(201).send({ status: true, message: "order placed", data: OrderCreated })
    }
}

