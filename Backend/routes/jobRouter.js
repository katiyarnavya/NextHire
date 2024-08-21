import express from "express";
import {isAuthenticated, isAutherized} from '../middlewares/auth.js'
import { postJob , getMyJobs, deleteJob, getASingleJob, getAllJobs} from "../controllers/jobControllers.js";

const router = express.Router();

router.post("/post", isAuthenticated, isAutherized("Employer"), postJob);
router.get('/getall', getAllJobs);
router.get('/getmyJobs', isAuthenticated, isAutherized("Employer"), getMyJobs);
router.delete('/delete/:id', isAuthenticated, isAutherized("Employer"), deleteJob);
router.get('/get/:id', isAuthenticated, getASingleJob);

export default router;