import express from "express";
import {
  createBookRequestController,
  getAllBookRequestsController,
  getBookRequestByIdController,
  deleteBookRequestController,
} from "../controllers/coverIdea.controller";
import uploadMiddleware from "../middlewares/upload.middleware";

const router = express.Router();

// Create a new book request (with image upload)
router.post("/createCoverIdea", uploadMiddleware, createBookRequestController);

// Get all book requests
router.get("/getCoverIdeas", getAllBookRequestsController);

// Get a specific book request by ID
router.get("/getCoverIdeasById/:id", getBookRequestByIdController);

// Delete a book request by ID
router.delete("/deleteCoverIdeasById/:id", deleteBookRequestController);

export default router;
