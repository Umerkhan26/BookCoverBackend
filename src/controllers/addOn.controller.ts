import { Request, Response } from "express";
import { createAddOnService, getAddOnsByPageService } from "../services/addOn.service";

export const createAddOn = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, qty, price, page } = req.body;

    if (!name || !price || !page || qty === undefined) {
      res.status(400).json({ message: "Name, price, qty, and page are required" });
      return;
    }

    const newAddOn = await createAddOnService({ name, qty, price, page });
    res.status(201).json({ message: "Add-on created successfully", addOn: newAddOn });
  } catch (error) {
    res.status(500).json({ message: "Error creating add-on", error: (error as Error).message });
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
