import express from "express"
import { isAuthenticated, isAutherized } from "../middlewares/auth.js";
import { deleteApplication, employerGetAllApplication, jobSeekerGetAllApplication, postApplication } from "../controllers/applicationController.js";

const router = express.Router();

router.post('/post/:id', isAuthenticated, isAutherized("Job Seeker"), postApplication);

router.get("/employer/getall", isAuthenticated, isAutherized("Employer"), employerGetAllApplication);
router.get("/jobSeeker/getall", isAuthenticated, isAutherized("Jon Seeker"), jobSeekerGetAllApplication);
router.delete("/delete/:id", isAuthenticated, deleteApplication); 


export default router; 