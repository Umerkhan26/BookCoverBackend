import { Request, Response } from "express";
import { getPackagesByPageService, createPackageService } from "../services/package.service";


export const getPackagesByPage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page } = req.query;

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
    const { name, description, price, features, freeFeatures, page, conceptPricing } = req.body;

    if (!name || !price || !page) {
      res.status(400).json({ message: "Name, price, and page are required" });
      return;
    }

    if (!Array.isArray(features) || !Array.isArray(freeFeatures)) {
      res.status(400).json({ message: "'features' and 'freeFeatures' must be arrays" });
      return;
    }

    // Ensure conceptPricing is in the correct format
    if (conceptPricing && !Array.isArray(conceptPricing)) {
      res.status(400).json({ message: "'conceptPricing' must be an array" });
      return;
    }

    const newPackage = await createPackageService({
      name,
      price,
      features,
      freeFeatures,
      page,
      conceptPricing
    });

    res.status(201).json({ message: "Package created successfully", package: newPackage });
  } catch (error) {
    res.status(500).json({ message: "Error creating package", error: (error as Error).message });
  }
};
