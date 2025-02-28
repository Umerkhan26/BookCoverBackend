import { AddOn, IAddOn } from "../models/addOn.model";


export const createAddOnService = async (data: {
  name: string;
  qty: number;
  price: number;
  page: string;
  packageId: string;
}): Promise<IAddOn> => {
  try {
    const newAddOn = new AddOn({
      name: data.name,
      qty: data.qty,
      price: data.price,
      page: data.page,
      package: data.packageId, // Ensure this matches the schema
    });

    // Save the new AddOn
    const savedAddOn = await newAddOn.save();

    // Populate 'package' field before returning
    const fullAddOn = await AddOn.findById(savedAddOn._id);

    return fullAddOn as IAddOn;
  } catch (error) {
    throw new Error(`Error creating add-on: ${(error as Error).message}`);
  }
};


export const getAddOnsByPageService = async (page: string): Promise<IAddOn[]> => {
  try {
    return await AddOn.find({ page }).populate("package"); // ✅ Populating package details
  } catch (error) {
    throw new Error(`Error fetching add-ons: ${(error as Error).message}`);
  }
};

export const getAddOnsByPackageService = async (packageId: string): Promise<IAddOn[]> => {
  try {
    return await AddOn.find({ package: packageId }).populate("package"); // ✅ Fetching by package
  } catch (error) {
    throw new Error(`Error fetching add-ons by package: ${(error as Error).message}`);
  }
};



export const getAddOnsByPackageId = async (packageId: string): Promise<IAddOn[]> => {
  try {
    const addOns = await AddOn.find({ package: packageId }); // Fetch all add-ons related to packageId
    return addOns;
  } catch (error) {
    throw new Error(`Error fetching add-ons: ${(error as Error).message}`);
  }
};
