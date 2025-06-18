import express from "express";
import {
  getUserData,
  updateUserResume,
  applForJob,
  getUserJobApplications,
} from "../controllers/userController.js";
import uplode from "../config/multer.js";

const router = express.Router();

//Get user Data
router.get("/user", getUserData);
//Apply for a job
router.post("/apply", applForJob);
// Get user applied applications
router.get("/applications", getUserJobApplications);
// Update Profile / Resume
router.post("/update-resume", uplode.single("resume"), updateUserResume);

export default router;
