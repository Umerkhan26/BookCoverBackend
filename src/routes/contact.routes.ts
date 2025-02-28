import express from "express";
import { createContact } from "../controllers/contact.controller";  // Import contact controller

const router = express.Router();

// POST route to handle contact form submission
router.post("/submit", createContact);

export default router;
