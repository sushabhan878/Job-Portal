import jwt from "jsonwebtoken";
import Company from "../models/Company.js";
// ProtectCompany is created to check the user is loged in or not, if user is not loged in then dont give the permission to add new jobs and access old jobs details
export const protectCompany = async (req, res, next) => {
  // requesting the token from the headers, it helps to know which user wanted to login
  const token = req.headers.token;
  // check if the token exist of not
  if (!token) {
    return res.json({ success: false, message: "Not Authorized, Login Again" });
  }
  // if token exist verify it and find the user id from database
  try {
    // decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // jreturn all the fields except password
    req.company = await Company.findById(decoded.id).select("-password");
    next();
    // catch error if something occures
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
