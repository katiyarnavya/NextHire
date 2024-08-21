import mongoose from "mongoose";
const jobSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    jobType:{
        type: String,
        required: true,
        enum: ["Full Time", "Part Time" , "InternShip"],
    },
    location:{
        type: String,
        required: true,
    },
    companyName:{
        type: String,
        required: true
    },
    introduction:{
        type: String
    },
    responsibilities:{
        type: String,
        required: true,
    },
    qualification:{
        type: String,
        required: true,
    },
    offers:{
        type: String,
          
    },
    salary:{
        type: String,
        required: true,
    },
    hiringMultiplePositions:{
        type: String,
        default: "No",
        enum: ["Yes", "No"]
    },
    personalWebsite:{
        title: String,
        url: String,
    },
    jobNiche:{
        type: String,
        required: true,
    },
    newsLettersSend:{
        type: Boolean,
        default: false,
    },
    jobPostedOne:{
        type: Date,
        default: Date.now,
    },
    postedBy:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    }


});

export const Job = mongoose.model("Job", jobSchema);
