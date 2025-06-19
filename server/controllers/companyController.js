import Company from "../models/Company.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utils/generateToken.js";
import Job from "../models/Job.js";
import JobApplications from "../models/JobApplications.js";
import JobApplication from "../models/JobApplications.js";
// Register a new company
export const registerCompany = async (req, res) => {
  // Defining fields for new user
  const { name, email, password } = req.body;
  // Requesting for image file
  const imageFile = req.file;
  if (!name || !email || !password || !imageFile) {
    return res.json({ success: false, message: "All fields are required" });
  }
  // Trying to find existing user if available
  try {
    const companyExist = await Company.findOne({ email });
    if (companyExist) {
      return res.json({
        success: false,
        message: "Company olready registered",
      });
    }
    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Uploading image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path);
    // Create new user
    const company = await Company.create({
      name,
      email,
      password: hashedPassword,
      image: imageUpload.secure_url,
    });
    // Return response
    res.json({
      success: true,
      company: {
        _id: company._id,
        name: company.name,
        email: company.email,
        image: company.image,
      },
      //Token generating for company id
      token: generateToken(company._id),
    });
    // If something happens then throgh this error
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Company Login
export const loginCompany = async (req, res) => {
  const { email, password } = req.body;
  try {
    const company = await Company.findOne({ email });
    if (bcrypt.compare(password, company.password)) {
      res.json({
        success: true,
        company: {
          _id: company._id,
          name: company.name,
          email: company.email,
          image: company.image,
        },
        token: generateToken(company._id),
      });
    } else {
      res.json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//Get company data
export const getCompanyData = async (req, res) => {
  const company = req.company;
  try {
    res.json({ success: true, company });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// post a new job
export const postNewJob = async (req, res) => {
  // Require all the fields to add new job
  const { title, description, location, salary, category, level } = req.body;
  // console the details for check
  const companyId = req.company._id;
  // Added a new job
  try {
    const newJob = new Job({
      title,
      description,
      location,
      salary,
      companyId,
      category,
      level,
      date: Date.now(),
    });
    // New job saved
    await newJob.save();
    res.json({ success: true, newJob });
    // If something occured error message will show
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//Get company job applicents
export const getCompanyJobApplicents = async (req, res) => {
  try {
    const companyId = req.company._id;
    // Find job applications foer user and populate realted data
    const applications = await JobApplication.find({ companyId })
      .populate("userId", "name image resume")
      .populate("jobId", "title location category level salary")
      .exec();

    return res.json({ success: true, applications });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get company posted jobs
export const getCompanyPostedJobs = async (req, res) => {
  try {
    const companyId = req.company._id;
    const jobs = await Job.find({ companyId });

    // Adding no. of applicants
    const jobsData = await Promise.all(
      jobs.map(async (job) => {
        const applicants = await JobApplications.find({ jobId: job._id });
        return { ...job.toObject(), applicants: applicants.length };
      })
    );
    res.json({ success: true, jobsData });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Change job spplication status
export const changeJobApplicationStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    // Find job application data and update status
    await JobApplication.findByIdAndUpdate({ _id: id }, { status });
    res.json({ success: true, message: "Status Changed Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Change Job visibility
export const changeVisibility = async (req, res) => {
  try {
    const { id } = req.body;
    const companyId = req.company._id;
    const job = await Job.findById(id);
    if (companyId.toString() === job.companyId.toString()) {
      job.visibility = !job.visibility;
    }
    await job.save();
    res.json({ success: true, job });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
