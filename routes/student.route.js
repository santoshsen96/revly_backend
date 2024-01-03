const express=require("express")
const {studentModel}=require("../model/students.model")
const {auth}=require("../middleware/auth.middleware")
const studentRouter=express.Router()
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


studentRouter.post("/register",async(req,res)=>{
    const {name,email,password,classGrade,language}=req.body
    try{
        bcrypt.hash(password, 5, async(err, hash)=> {
            // Store hash in your password DB.
            if(err){
                res.status(400).json({error:err.message})
            }else{
                const user=new studentModel({name,email,password:hash,classGrade,language})
                await user.save()
                res.status(200).json({msg:"new student added",updatedStudent:req.body})
            }
        });
        
       
    }catch(err){
        res.status(400).json({err:err.message})
    }

})


studentRouter.post("/login",async(req,res)=>{
const {email,password}=req.body
    try{
        const user=await studentModel.findOne({email})
        
        if(user){
            bcrypt.compare(password, user.password, (err, result)=> {
                // result == true
                if(result){
                    let token=jwt.sign({userID:user._id,user:user.name},'masai')
                    res.status(200).json({msg:"Login Successfull!!",token:token})
                }else{
                    res.status(200).json({msg:"Wrong Credential!!"})
                }
            });
           
        }else{
            res.status(200).json({msg:"Wrong Credential!!"})
        }
    }catch(err){
        res.status(400).json({error:err.message})
    }
})


module.exports={
    studentRouter
}