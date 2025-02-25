import { AddOn, IAddOn } from "../models/addOn.model";

export const createAddOnService = async (data: {
  name: string;
  qty: number;
  price: number;
  page: string;
}): Promise<IAddOn> => {
  try {
    const newAddOn = new AddOn({
      name: data.name,
      qty: data.qty, // ✅ Updated field
      price: data.price,
      page: data.page,
    });

    return await newAddOn.save();
  } catch (error) {
    throw new Error(`Error creating add-on: ${(error as Error).message}`);
  }
};

export const getAddOnsByPageService = async (page: string): Promise<IAddOn[]> => {
  try {
    return await AddOn.find({ page });
  } catch (error) {
    throw new Error(`Error fetching add-ons: ${(error as Error).message}`);
  }
};
