import Job from "../models/Job.js";
import JobApplication from "../models/JobApplications.js";
import User from "../models/User.js";

// Get user data
export const getUserData = async (req, res) => {
  const userId = req.auth.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Apply for a job
export const applForJob = async (req, res) => {
  const { jobId } = req.body;
  const userId = req.auth.userId;
  try {
    const isAlreadyApplied = await JobApplication.find({ jobId, userId });
    if (isAlreadyApplied) {
      return res.json({
        success: false,
        message: "Already applied for this job",
      });
    }
    const jobData = await Job.findById({ jobId });
    if (!jobData) {
      return res.json({ success: false, message: "Job not found" });
    }
    await JobApplication.create({
      companyId: jobData.companyId,
      userId,
      jobId,
      date: Date.now(),
    });
    res.json({ success: true, message: "Application sent successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get user applied applications
export const gerUserJobApplications = async (req, res) => {};

// Update Profile / Resume
export const updateUserResume = async (req, res) => {};
