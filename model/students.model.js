const mongoose=require("mongoose")

const userSchema=mongoose.Schema({
    name:String,
    email:String,
    password:String,
    classGrade: String,
    language: String,
    socketId: String,
},{
    versionKey:false
})

const studentModel=mongoose.model("student",userSchema)

module.exports={
    studentModel
}