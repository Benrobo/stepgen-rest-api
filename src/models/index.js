const { model, Schema } = require("mongoose")


// const userSchema = new Schema({
//     username: { type: String, default: null },
//     email: { type: String, unique: true },
//     hash: { type: String },
//     token: { type: String }
// })

// const User = model('User', userSchema);

const resumeSchema = new Schema({
    id: String,
    fullName: String,
    profileImage: String,
    jobType: String,
    phone: String,
    email: String,
    address: String,
    workExp: [{ title: String, date: String, location: String, description: String }],
    education: [{ title: String, description: String, date: String }],
    hobbies: String,
    famousQuote: String,
    locked: Boolean,
    hash: String,
    professionalSkills: [
        {
            name: String,
            level: String
        }
    ],
    personalSkills: [String],
    socials: [String]
})

const Resume = model('Resume', resumeSchema);

module.exports = {
    Resume
}