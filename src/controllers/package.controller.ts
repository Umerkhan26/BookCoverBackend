import { Request, Response } from "express";
import { getPackagesByPageService, createPackageService } from "../services/package.service";


export const getPackagesByPage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page } = req.params;  // Change from req.query to req.params

    if (!page || typeof page !== "string") {
      res.status(400).json({ message: "Invalid or missing 'page' parameter" });
      return;
    }

    const packages = await getPackagesByPageService(page);
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching packages", error: (error as Error).message });
  }
};




export const createPackage = async (req: Request, res: Response): Promise<void> => {
  try {
    // Log the incoming request body for debugging
    console.log("Received request body:", req.body);

    const packages = req.body; // Now we expect an array of packages

    // Loop through each package in the array
    for (const packageData of packages) {
      const { name, price, features, freeFeatures, page, conceptPricing } = packageData;

      // Check for missing required fields for each package
      if (!name || !price || !page) {
        console.error("Missing required fields for package:", { name, price, page });
        res.status(400).json({ message: "Name, price, and page are required for each package" });
        return;
      }

      // Validate that features and freeFeatures are arrays
      if (!Array.isArray(features) || !Array.isArray(freeFeatures)) {
        console.error("Invalid data types for features or freeFeatures:", { features, freeFeatures });
        res.status(400).json({ message: "'features' and 'freeFeatures' must be arrays" });
        return;
      }

      // Validate that conceptPricing (if provided) is an array
      if (conceptPricing && !Array.isArray(conceptPricing)) {
        console.error("Invalid data type for conceptPricing:", conceptPricing);
        res.status(400).json({ message: "'conceptPricing' must be an array" });
        return;
      }

      // Call the service to create the package
      await createPackageService({
        name,
        price,
        features,
        freeFeatures,
        page,
        conceptPricing
      });
    }

    // Return success response once all packages are processed
    res.status(201).json({
      message: "Packages created successfully"
    });
  } catch (error) {
    // Log the error for debugging
    console.error("Error creating packages:", error);

    // Return a generic error response
    res.status(500).json({
      message: "Error creating packages",
      error: (error as Error).message
    });
  }
};
