import { Request, Response } from "express";
import { createContactService } from "../services/contact.service"; // Import service

export const createContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, email, referral, message } = req.body;

    // Validation
    if (!firstName || !lastName || !email || !message) {
      res.status(400).json({ message: "First Name, Last Name, Email, and Message are required." });
      return;
    }

    // Call service to handle the data submission
    const contactData = await createContactService({ firstName, lastName, email, referral, message });

    res.status(201).json({ message: "Contact form submitted successfully.", contactData });
  } catch (error) {
    res.status(500).json({ message: "Error submitting contact form.", error: (error as Error).message });
  }
};
