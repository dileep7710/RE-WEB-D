const mongoose = require("mongoose");
const {Schema} = mongoose;

main()
    .then(() => console.log("connection successful"))
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/relationDemo");
}
const orderSchema = new Schema({
    item: String,
    price: Number, 
   
});
const customerSchema = new Schema({
    name: String,
    orders: [
        {
            type: Schema.Types.ObjectId,
            ref: "Order",
        },
    ],

});

// customerSchema.pre("findOneAndDelete", async () => {
//     console.log("PREE MIDDLEWARE");
// });

customerSchema.post("findOneAndDelete", async (customer) => {
    if(customer.orders.length){
        let res = await Order.deleteMany({_id: {$in: customer.orders }});
        console.log(res);
    }
});

const Order = mongoose.model("Order", orderSchema);
const customer = mongoose.model("Customer", customerSchema);

const findCustomer = async () => {
    let result = await customer.find({}).populate("orders");
    console.log(result[0]);
};

const addCust = async () => {
    let newCust = new customer({
        name: "Karan Arjun"
    });

    let newOrder = new Order({
        item: "Pizza",
        price: 250,
    });

    newCust.orders.push(newOrder);

    await newOrder.save();
    await newCust.save();

    console.log("added new customer");
};

const delCust = async () => {
    let data = await customer.findByIdAndDelete("6ad9de9e9d0aff996a1f35be");
    console.log(data);
};

//addCust();
delCust();