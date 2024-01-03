const express=require("express")
const {doubtRequestModel}=require("../model/doubtRequest.model")
const {tutorModel}=require("../model/tutors.model")
const {auth}=require("../middleware/auth.middleware")
const io = require('socket.io')();
//require ('../cron')
const doubtRouter=express.Router()
doubtRouter.use(auth)

doubtRouter.post("/create", async (req, res) => {
    try {
      const { subjectType, language, classGrade } = req.body;
  
      // Check if there are online tutors matching the criteria
      const onlineTutors = await tutorModel.find({
        date: { $gt: new Date(new Date() - 30000) }, // Online in the last 30 seconds
        classGrade: req.body.classGrade,
        language: req.body.language,
        subjectType: req.body.subjectType,
    });
    onlineTutors.forEach((tutor) => {
        console.log(`Online Tutor Language: ${tutor.language}`);
      });
 
      if (onlineTutors.length === 0) {
        return res.status(200).json({ msg: 'No online tutors available for this doubt request' });
      }
  
      // Create doubt request
      const note = new doubtRequestModel({
        subjectType,
        language,
        classGrade,
        studentId: req.body.userID,
        tutorsNotified: onlineTutors.map((tutor) => tutor._id), 
      });
  
      await note.save();
  
      // Notify eligible tutors in real-time
      onlineTutors.forEach((tutor) => {
        io.to(tutor.tutorId).emit('new-doubt-request', { _id: note._id });
      });
  
      res.status(201).json({ message: 'Doubt request created successfully' });
    } catch (error) {
      console.error('Error in creating doubt request:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

doubtRouter.get("/",async(req,res)=>{
    try{
        const notes=await doubtRequestModel.find({userID:req.body.userID}).sort({ date: -1 })
        res.send(notes)
    }catch(err){
        res.json({error:err.message})
    }
})

module.exports={
    doubtRouter
}

// try{
//     const note=new doubtRequestModel(req.body)
//     await note.save()
//     res.json({msg:"new doubt added",note:req.body})
// }catch(err){
//     res.json({error:err.message})
// }