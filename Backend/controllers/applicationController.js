import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js"
import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";
import {v2 as cloudinary} from "cloudinary"


export const postApplication = catchAsyncError(async(req, res, next)=>{
    const {id} = req.params;
    const {name, email, phone, address, coverLetter} = req.body;
    if(!name || !email || !phone || !address || !coverLetter){
        return next(new ErrorHandler("All fields are required", 404));
    }
    
    const jobSeekerInfo = {
        id: req.user.id,
        name, email, phone, address, coverLetter, role: "Job Seeker"
    };
    const jobDetails = await Job.findById(id);
    if(!jobDetails){
        return  next(new ErrorHandler("Job Not Found", 404));
    }
    const isAlreadyApplied =  await Application.findOne({
        "jobInfo.jobId": id,
        "jobSeekerInfo.id": req.user._id,
    });
    if(isAlreadyApplied){
        return next(new ErrorHandler("you have already applied", 404))
    }
    if(req.files && req.files.resume){
        const {resume} = req.files;
        try {
            const cloudinaryResponse  = await cloudinary.uploader.upload(resume.tempFilePath, {
                folder: "Job Seeker's Resume"
                
            });
            if(!cloudinaryResponse || cloudinaryResponse.error){
                return next(new ErrorHandler("Failed to upload resume to cloudinary", 500));
            }
            jobSeekerInfo.resume = {
                public_id: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url
            }

        } catch (error) {
            return next(new ErrorHandler("Failed to upload Resume", 500))
        }
    }
    else{
        if(req.user && !req.user.resume.url){
            return next(new ErrorHandler("Please Upload your resume", 40))
        }
        jobSeekerInfo.resume = {
            public_id: req.user && req.user.public_id,
            url: req.user && req.user.resume.url,
        }

    };
    const employerInfo = {
        id: jobDetails.postedBy,
        role: "Employer"
    }
    const jobInfo = {
        jobId: id,
        jobTitle: jobDetails.title
    }
    const application = await Application.create({
        jobSeekerInfo,
        employerInfo,
        jobInfo,
    })
    res.status(201).json({
        success: true,
        message: "Application Submitted",
        application,
    });
    

});
export const employerGetAllApplication = catchAsyncError(async(req, res, next)=>{
    const {_id} = req.user;
    const application = await Application.find({
        "employerInfo.id": _id,
        "deletedBy.employer": false,
    })
    res.status(200).json({
        success: true,
        applications
    })
})
export const jobSeekerGetAllApplication = catchAsyncError(async(req, res, next)=>{
    const {_id} = req.user;
    const application = await Application.find({
        "jobSeekerInfo.id": _id,
        "deletedBy.jobSeeker": false,
    })
    res.status(200).json({
        success: true,
        applications
    })
})
export const deleteApplication = catchAsyncError(async(req, res, next)=>{
    const {} = req.params;
    const application = await Application.findById(id);
    if(!application){
        return next(new ErrorHandler("Application Not Found", 404));
    }
    const {} = req.user;
    switch (role) {
        case "Job Seeker":
            application.deletedBy.jobSeeker = true;
            await application.save();
            break;
        case "Employer":
            application.deletedBy.employer = true;
            await application.save();
            break;
    
        default:
            break;
    }
    if(application.deletedBy.employer === true && application.deletedBy.jobSeeker === true){
        await application.deleteOne();
    }
    res.status(200).json({
        success: true,
        message: "Application Deleted"
    })

})