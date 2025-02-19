import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req: Request, file: Express.Multer.File) => ({
    folder: "book_requests", // Folder in Cloudinary
    format: "jpeg", // Image format
    public_id: file.originalname.split(".")[0], // Keep original name
  }),
});

// Initialize Multer with Cloudinary storage
const upload = multer({ storage });

// Middleware function to handle file uploads
export const uploadMiddleware = upload.array("comparableCovers", 4); // Allows up to 4 images

export default uploadMiddleware;
