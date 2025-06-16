import express from "express";
import {
  registerCompany,
  loginCompany,
  getCompanyData,
  postNewJob,
  getCompanyJobApplicents,
  getCompanyPostedJobs,
  changeJobApplicationStatus,
  changeVisibility,
} from "../controllers/companyController.js";
import uplode from "../config/multer.js";
import { protectCompany } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Register a company
router.post("/register", uplode.single("image"), registerCompany);
// Login a company
router.post("/login", loginCompany);
// Get compant data
router.get("/company", protectCompany, getCompanyData);
// Post job
router.post("/post-job", protectCompany, postNewJob);
// Get Applicants data
router.get("/applicants", protectCompany, getCompanyJobApplicents);
// Get company posted jobs
router.get("/list-jobs", protectCompany, getCompanyPostedJobs);
// Change application status
router.post("/change-status", protectCompany, changeJobApplicationStatus);
// change application visibility
router.post("/change-visibility", protectCompany, changeVisibility);

export default router;
