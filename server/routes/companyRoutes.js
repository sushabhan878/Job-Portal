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

const router = express.Router();

// Register a company
router.post("/register", uplode.single("image"), registerCompany);
// Login a company
router.post("/login", loginCompany);
// Get compant data
router.get("/company", getCompanyData);
// Post job
router.post("/postjob", postNewJob);
// Get Applicants data
router.get("/applicants", getCompanyJobApplicents);
// Get company posted jobs
router.get("/list-jobs", getCompanyPostedJobs);
// Change application status
router.post("/change-status", changeJobApplicationStatus);
// change application visibility
router.post("/change-visibility", changeVisibility);

export default router;
