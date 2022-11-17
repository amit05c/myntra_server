const mongoose= require("mongoose")

const cartSchema= new mongoose.Schema({
    category: {type: String, require:true},
    title: {type: String, require : true},
    item: String,
    image_url: [{type: String}],
    size:String,
    price: Number,
    userId:String,
    productId: String,
    rate: Number,
    qty: Number
})

const CartModel = mongoose.model('cart_data',cartSchema)
module.exports={
    CartModel
}

