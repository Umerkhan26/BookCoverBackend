import { Request, Response } from "express";
import {
  createBookRequest,
  getAllBookRequests,
  getBookRequestById,
  deleteBookRequestById,
} from "../services/coverIdea.service";
import { IBookRequest } from "../models/coverIdea.model";
import BookRequestSchema from "../models/coverIdea.model";
import mongoose from "mongoose";


/**
 * Create a new book request
 */
export const createBookRequestController = async (req: Request, res: Response) => {
  try {
    const { name, title, genre, isSeries, description, coverPreference, mainCharacters, keyObjects, setting, email } =
      req.body;

    // Get uploaded image URLs from Cloudinary
    const comparableCovers = req.files ? (req.files as Express.Multer.File[]).map((file) => (file as any).path) : [];

    // Create a new book request object with the correct type
    const newBookRequest: IBookRequest = new BookRequestSchema({
      name,
      title,
      genre,
      isSeries,
      description,
      coverPreference,
      mainCharacters,
      keyObjects,
      setting,
      comparableCovers,
      email,
    });

    // Save to database
    const savedBookRequest = await newBookRequest.save();

    res.status(201).json({ message: "Book request created successfully!", bookRequest: savedBookRequest });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Failed to create book request." });
  }
};

/**
 * Get all book requests
 */
export const getAllBookRequestsController = async (_req: Request, res: Response) => {
  try {
    const bookRequests = await getAllBookRequests();
    res.status(200).json(bookRequests);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Failed to fetch book requests." });
  }
};

/**
 * Get a single book request by ID
 */
export const getBookRequestByIdController = async (req: Request, res: Response):Promise<any> => {
  try {
    const { id } = req.params;

    // Validate if the ID is a proper MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid book request ID format." });
    }

    // Fetch book request
    const bookRequest = await getBookRequestById(id);
    if (!bookRequest) {
      return res.status(404).json({ error: "Book request not found." });
    }

    res.status(200).json(bookRequest);
  } catch (error: any) {
    console.error("Error fetching book request:", error);
    res.status(500).json({ error: "Internal server error. Please try again later." });
  }
};

/**
 * Delete a book request by ID
 */
export const deleteBookRequestController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteBookRequestById(id);
    res.status(200).json({ message: "Book request deleted successfully." });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Failed to delete book request." });
  }
};
