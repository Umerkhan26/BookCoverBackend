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
router.post("/", uploadMiddleware, createBookRequestController);

// Get all book requests
router.get("/", getAllBookRequestsController);

// Get a specific book request by ID
router.get("/:id", getBookRequestByIdController);

// Delete a book request by ID
router.delete("/:id", deleteBookRequestController);

export default router;
