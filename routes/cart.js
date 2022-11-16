const {Router}= require("express")
const cartRouter= Router()
const {CartModel}= require("../model/cart.model")
const {DataModel}= require("../model/data.model")
cartRouter.post("/add/:_id",async(req,res)=>{
    let {userId,size}=(req.body)
    let {_id}=(req.params)
   let data= await DataModel.findOne({_id})

   try{
    let newCartData=new CartModel({ 
        category: data.category,
        item: data.item,
        title: data.title,
        size,
        price:data.price,
        image_url: data.image_url,
        userId,
        productId: data._id
       })
       console.log(newCartData)
        await newCartData.save()
    res.status(200).send("sended")
   }
   catch(err){
   res.status(400).send("Please login first")
   }
   
   
})

cartRouter.get("/cartData",async(req,res)=>{
    try{
        let {userId}=(req.body)
        console.log(userId)
        let data= await CartModel.find({userId})
        res.status(200).send(data)
    }
    catch(err){
         res.status(400).send("something went wrong")
    }
})



module.exports={
    cartRouter
}
