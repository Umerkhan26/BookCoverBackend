import { Request, Response } from "express";
import { Order, IOrder } from "../models/order.model";
import { Package } from "../models/package.model";
import { AddOn, IAddOn } from "../models/addOn.model";

export const createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId, packageId, addOnIds } = req.body;
  
      const selectedPackage = await Package.findById(packageId);
      if (!selectedPackage) {
        res.status(404).json({ message: "Package not found" });
        return;
      }
  
      let totalPrice = selectedPackage.price;
      let selectedAddOns: IAddOn[] = []; // ✅ Explicitly typed array
  
      if (addOnIds && addOnIds.length > 0) {
        selectedAddOns = await AddOn.find({ _id: { $in: addOnIds } }) as IAddOn[]; // ✅ Type assertion
        selectedAddOns.forEach((addOn) => (totalPrice += addOn.price));
      }
  
      const newOrder: IOrder = new Order({
        user: userId,
        package: packageId,
        addOns: selectedAddOns.map((a) => a._id),
        totalPrice,
      });
  
      await newOrder.save();
      res.status(201).json({ message: "Order placed successfully", order: newOrder });
    } catch (error) {
      res.status(500).json({ message: "Error creating order", error: (error as Error).message });
    }
  };
  
export const getUserOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ user: userId }).populate("package").populate("addOns");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error: (error as Error).message });
  }
};

export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate("package").populate("addOns").populate("user");
    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error: (error as Error).message });
  }
};
