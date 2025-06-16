import "./config/instrument.js";
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import * as Sentry from "@sentry/node";
import { clerkWebhook } from "./controllers/webhooks.js";
import companyRoutes from "./routes/companyRoutes.js";
import connectCloudinary from "./config/cloudinary.js";

//Port defining
const port = process.env.PORT || 5000;

//Initialization of express package
const app = express();

//Connect to database
await connectDB();
await connectCloudinary();

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.get("/", (req, res) => {
  res.send("API is working properly");
});
app.post("/webhooks", clerkWebhook);
app.use("/api/company", companyRoutes);
//Sentry connection
Sentry.setupExpressErrorHandler(app);

// Starting the app
app.listen(port, () => {
  console.log(`Server is runing on port: ${port}`);
});
