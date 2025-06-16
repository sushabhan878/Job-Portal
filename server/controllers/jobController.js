import Job from "../models/Job.js";

// Get all jobs
export const getJobs = async (req, res) => {
  try {
    // find all the listed jobs with visibility true, then populate companyId to see the company details except password
    const jobs = await Job.find({ visibility: true }).populate({
      path: "companyId",
      select: "-password",
    });
    // if jobs found
    res.json({ success: true, jobs });
  } catch (error) {
    // If something happens then show the error message
    res.json({ success: false, message: error.message });
  }
};

// Get a single job by id
export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id).populate({
      path: "companyId",
      select: "-password",
    });
    if (!job) {
      return res.json({ success: false, message: "Job not found" });
    }
    res.json({ success: true, job });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
