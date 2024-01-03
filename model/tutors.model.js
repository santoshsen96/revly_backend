const mongoose = require("mongoose");

const tutorSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    subjectType: String,
    socketId: String,
    classGrade: {
        type: String,
        validate: {
            validator: value => /^(6|7|8|9|10)-(6|7|8|9|10)$/.test(value),
            message: props => `${props.value} is not a valid class grade. It should be in the format of '6-10', '6-8', etc.`,
        },
    },
    language: String,
    date: {
        type: Date,
        default: Date.now(),
    },
}, {
    versionKey: false
});

const tutorModel = mongoose.model("tutor", tutorSchema);

module.exports = {
    tutorModel
};
