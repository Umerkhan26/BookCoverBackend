import { Package, IPackage } from "../models/package.model";


export const getPackagesByPageService = async (page: string): Promise<IPackage[]> => {
  try {
    return await Package.find({ page });
  } catch (error) {
    throw new Error(`Error fetching packages: ${(error as Error).message}`);
  }
};

export const createPackageService = async (data: {
  name: string;
  price: number;
  features: string[];
  freeFeatures?: string[];
  page: string;
  conceptPricing?: { conceptCount: number; additionalPrice: number }[];
}): Promise<IPackage> => {
  try {
    const newPackage = new Package({
      name: data.name,
      price: data.price,
      features: data.features,
      freeFeatures: data.freeFeatures || [],
      page: data.page,
      conceptPricing: data.conceptPricing || []
    });

    return await newPackage.save();
  } catch (error) {
    throw new Error(`Error creating package: ${(error as Error).message}`);
  }
};
