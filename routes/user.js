const {Router}= require("express")
const userRouter= Router()
const {UserModel} = require("../model/user.model")
const bcrypt= require("bcrypt")
require('dotenv').config()
const jwt = require('jsonwebtoken');
userRouter.post("/signup",(req,res)=>{
    let {email,password}= req.body

    
    
    bcrypt.hash(password, 6, async function(err, hash) {
        if(err){
            res.status(400).send({"Error":"someting error"})
        }else{
            
        
            const newUser= new UserModel({email,password: hash})
            await newUser.save()
            res.status(200).send({"message":"successfully registered"})
        }
    });
    
})


userRouter.post("/login",async(req,res)=>{
    let {email,password}= req.body
    let user= await UserModel.findOne({email})
    let hash= user.password
    bcrypt.compare(password, hash, async function(err, result) {
        // console.log(result)
       if(user && result){

        var token =  jwt.sign({userId: user._id}, process.env.JWT_SECRET);
        // console.log(token)
         res.status(400).send({
            message: "login successful",
            token
         })

       }else{
          res.status(200).send({"Error":"someting error"})
       
       }
    });
})

module.exports={
    userRouter
}
