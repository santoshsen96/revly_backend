const mongoose = require("mongoose");

const doubtSchema = mongoose.Schema({
    user: String,
    userID: String,
    subjectType: String,
    classGrade: String,
    language: String,
    status:String,
    date: {
        type: Date,
        default: Date.now(),
    },
}, {
    versionKey: false
});

const doubtRequestModel = mongoose.model("doubtRequest", doubtSchema);

module.exports = {
    doubtRequestModel
};
