const {Router}= require("express")
const cartRouter= Router()
const {CartModel}= require("../model/cart.model")
const {DataModel}= require("../model/data.model")
cartRouter.post("/add/:_id",async(req,res)=>{
    let {userId,size}=(req.body)
    let {_id}=(req.params)
   let data= await DataModel.findOne({_id})
//    res.send({message: data})
console.log(data)
   let newCartData=new CartModel({ 
    category: data.category,
    item: data.item,
    title: data.title,
    size,
    image_url: data.image_url,
    userId,
    productId: data._id
   })
   console.log(newCartData)
    await newCartData.save()
res.send("sended")
   
})



module.exports={
    cartRouter
}
