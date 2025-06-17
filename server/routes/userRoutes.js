import express from "express";
import {
  getUserData,
  updateUserResume,
  applForJob,
  gerUserJobApplications,
} from "../controllers/userController.js";

const router = express.Router();

//Get user Data
router.get("/user", getUserData);
//Apply for a job
router.post("/apply", applForJob);
// Get user applied applications
router.get("/applications", gerUserJobApplications);
// Update Profile / Resume
router.post("/update-resume", upload.single("resume"), updateUserResume);

export default router;
