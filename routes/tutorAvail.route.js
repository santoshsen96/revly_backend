const express = require('express');
const tutorAvailRouter = express.Router();
const TutorAvailability = require('../model/tutorAvail.model');
const { auth } = require("../middleware/auth.middleware");
const { tutorModel } = require("../model/tutors.model");

tutorAvailRouter.use(auth);

// Polling function endpoint
tutorAvailRouter.patch('/update-tutor-ping/:noteID', async (req, res) => {
  const userIDinUserDoc = req.body.userID;
  const { noteID } = req.params;  // Use the noteID from URL params
  try {
    const note = await tutorModel.findOne({ _id: noteID });
   // const userIDinNoteDoc = note;

    if (noteID === note._id.toString()) {
      await tutorModel.findByIdAndUpdate( noteID , {date:Date.now()});
      res.json({ msg: `${note.name} has been updated` });
    } else {
      res.json({ msg: "Not authorized" });
    }
  } catch (err) {
    res.json({ error: err });
  }
});

module.exports = { tutorAvailRouter };
