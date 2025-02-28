import { Request, Response } from "express";
import { createAddOnService, getAddOnsByPageService, getAddOnsByPackageService, getAddOnsByPackageId } from "../services/addOn.service";

export const createAddOn = async (req: Request, res: Response): Promise<void> => {
  try {
    const { packageId, addons } = req.body;

    if (!packageId || !Array.isArray(addons) || addons.length === 0) {
      res.status(400).json({ message: "packageId and at least one add-on are required" });
      return;
    }

    const savedAddOns = [];

    for (const addOn of addons) {
      const { name, qty, price, page } = addOn;

      if (!name || !price || qty === undefined || !page) {
        res.status(400).json({ message: "Name, price, qty, and page are required for each add-on" });
        return;
      }

      const savedAddOn = await createAddOnService({ name, qty, price, page, packageId });
      savedAddOns.push(savedAddOn); // Store saved add-ons
    }

    res.status(201).json({
      message: "Add-ons created successfully",
      data: savedAddOns, // Return saved data
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating add-ons", error: (error as Error).message });
  }
};



export const getAddOnsByPage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page } = req.params;

    if (!page) {
      res.status(400).json({ message: "Page parameter is required" });
      return;
    }

    const addOns = await getAddOnsByPageService(page);
    res.status(200).json({ message: "Add-ons fetched successfully", addOns });
  } catch (error) {
    res.status(500).json({ message: "Error fetching add-ons", error: (error as Error).message });
  }
};

export const getAddOnsByPackage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { packageId } = req.params; // 🔹 Fetching by packageId

    if (!packageId) {
      res.status(400).json({ message: "Package ID parameter is required" });
      return;
    }

    const addOns = await getAddOnsByPackageService(packageId);
    res.status(200).json({ message: "Add-ons fetched successfully", addOns });
  } catch (error) {
    res.status(500).json({ message: "Error fetching add-ons by package", error: (error as Error).message });
  }
};





export const getAddOns = async (req: Request, res: Response): Promise<void> => {
  try {
    const { packageId } = req.params; // Extract packageId from params

    if (!packageId) {
      res.status(400).json({ message: "Package ID is required" });
      return;
    }

    const addOns = await getAddOnsByPackageId(packageId);

    if (addOns.length === 0) {
      res.status(404).json({ message: "No add-ons found for this package" });
      return;
    }

    res.status(200).json({ message: "Add-ons fetched successfully", data: addOns });
  } catch (error) {
    res.status(500).json({ message: "Error fetching add-ons", error: (error as Error).message });
  }
};
