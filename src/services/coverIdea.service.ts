import BookRequest, { IBookRequest } from "../models/coverIdea.model";

/**
 * Creates a new book request
 */
export const createBookRequest = async (data: IBookRequest): Promise<IBookRequest> => {
  try {
    const bookRequest = new BookRequest(data);
    return await bookRequest.save();
  } catch (error) {
    throw new Error("Failed to create book request.");
  }
};

/**
 * Fetches all book requests
 */
export const getAllBookRequests = async (): Promise<IBookRequest[]> => {
  try {
    return await BookRequest.find();
  } catch (error) {
    throw new Error("Failed to fetch book requests.");
  }
};

/**
 * Fetches a single book request by ID
 */
export const getBookRequestById = async (id: string): Promise<IBookRequest | null> => {
  try {
    return await BookRequest.findById(id);
  } catch (error) {
    console.error("Database error while fetching book request:", error);
    throw new Error("Failed to fetch book request.");
  }
};

/**
 * Deletes a book request by ID
 */
export const deleteBookRequestById = async (id: string): Promise<void> => {
  try {
    const result = await BookRequest.findByIdAndDelete(id);
    if (!result) throw new Error("Book request not found.");
  } catch (error) {
    throw new Error("Failed to delete book request.");
  }
};
