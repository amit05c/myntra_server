const {Router}= require("express")
const cartRouter= Router()
const {CartModel}= require("../model/cart.model")
const {DataModel}= require("../model/data.model")
cartRouter.post("/add/:_id",async(req,res)=>{
    let {userId,size,qty}=(req.body)
    let {_id}=(req.params)
   let data= await DataModel.findOne({_id})

   try{
    let x= data.price*Number(qty)
    console.log(x)
    let newCartData=new CartModel({ 
        category: data.category,
        item: data.item,
        title: data.title,
        size,
        qty,
        price:x,
        image_url: data.image_url,
        userId,
        rate: data.price,
        productId: data._id

       })
    //    console.log(newCartData)
        await newCartData.save()
    res.status(200).send("sended")
   }
   catch(err){
    console.log(err)
   res.status(400).send("Please login first")
   }
   
   
})

cartRouter.get("/cartData",async(req,res)=>{
    try{
        let {userId}=(req.body)
        console.log(userId)
        let data= await CartModel.find({userId})
        let total= data.reduce((acc,obj)=>{return acc + obj.price},0)
        // console.log(total)
        res.status(200).send({data,total})
    }
    catch(err){
         res.status(400).send("something went wrong")
    }
})

cartRouter.patch("/update/:_id",async(req,res)=>{
    try{
        
        let {_id}=(req.params)
        let {userId}=req.body
        let {qty}=req.body
        let data= await CartModel.findOne({_id,userId})
        // let price=data.price
        console.log(data)
        let rate=data.rate
        let newPrice= qty*rate
        let updatedData= await CartModel.updateOne({_id},{$set:{price:newPrice, qty}})
        console.log(updatedData)
        res.status(200).send("done")

    }
    catch(err){
           res.status(500).send("You are not auuthorized to do this")
    }
})

cartRouter.delete("/delete/:_id",async(req,res)=>{
    try{
     let {_id}=req.params
     let {userId}= req.body
    let x= await CartModel.deleteOne({_id,userId})
    console.log(x)
    if(x.deletedCount>0){

        res.status(200).send("Item deleted")
    }else{
        res.status(400).send("You are not auuthorized")
    }
    }
    catch(err){
       res.status(500).send("You are not auuthorized")
    }
})

cartRouter.get("/total",(req,res)=>{
    try{
      
    }
    catch(err){

    }
})

cartRouter.delete("/checkout",async(req,res)=>{
    let {userId}= req.body
    let x= await CartModel.deleteMany({userId})

    if(x.deletedCount>0){
         console.log(x)
       return res.status(200).send("Item deleted")
    }else{
        res.status(400).send({"Error": "something eror"})
    }

})

module.exports={
    cartRouter
}
