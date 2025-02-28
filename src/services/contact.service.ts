import { IContact } from "../models/contact.model"; // Import contact model
import { Contact } from "../models/contact.model";  // Import the contact model

export const createContactService = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  referral?: string;
  message: string;
}): Promise<IContact> => {
  try {
    const contact = new Contact({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      referral: data.referral || "",
      message: data.message,
    });

    // Save the contact form data to the database
    return await contact.save();
  } catch (error) {
    throw new Error(`Error saving contact data: ${(error as Error).message}`);
  }
};
