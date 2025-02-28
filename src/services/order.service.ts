import { Package } from "../models/package.model";
import { AddOn } from "../models/addOn.model";
import { Order, IOrder } from "../models/order.model";
import { IAddOn } from "../models/addOn.model";
import { createErrorResponse } from "../utils/errorResponse"; // Custom error handling function

/**
 * Creates an order and calculates the total price.
 * @param userId - The ID of the user placing the order.
 * @param packageId - The ID of the selected package.
 * @param addOnIds - The list of additional add-ons selected by the user.
 * @param orderDetails - Additional order details like book info, cover style, etc.
 * @returns The created order.
 */
export const createOrder = async (
  userId: string,
  packageId: string,
  addOnIds: string[],
  orderDetails: any // Include all the extra form fields here
): Promise<IOrder> => {
  try {
    // Fetch selected package
    const selectedPackage = await Package.findById(packageId);
    if (!selectedPackage) {
      throw createErrorResponse("Package not found", 404); // Custom error handling
    }

    // Initialize total price with the base package price
    let totalPrice = selectedPackage.price;
    let selectedAddOns: IAddOn[] = [];

    // Calculate price with add-ons
    if (addOnIds && addOnIds.length > 0) {
      selectedAddOns = await AddOn.find({ _id: { $in: addOnIds } });
      selectedAddOns.forEach((addOn) => (totalPrice += addOn.price));
    }

    // Create a new order with all the details
    const newOrder: IOrder = new Order({
      user: userId,
      package: packageId,
      addOns: selectedAddOns.map((a) => a._id),
      totalPrice,
      status: "Submitted",  // Status passed from frontend or default to "Pending"
      ...orderDetails,
    });

    // Save the new order to the database
    await newOrder.save();
    return newOrder;
  } catch (error:any) {
    // Handle errors gracefully
    throw createErrorResponse(error.message || "Error creating order", error.statusCode || 500);
  }
};


/**
 * Fetches all orders for the given userId.
 * @param userId - The ID of the user whose orders we want to fetch.
 * @returns The list of orders for the specified user.
 */
export const getOrdersByUserIdService = async (userId: string): Promise<IOrder[]> => {
    try {
      // Fetch orders associated with the userId
      const orders = await Order.find({ user: userId }).populate("package").populate("addOns").populate("user");
  
      // If no orders are found, throw an error
      if (!orders || orders.length === 0) {
        throw  createErrorResponse("No orders found for this user", 404);
      }
  
      return orders;
    } catch (error) {
      throw createErrorResponse("Error fetching orders", 500);
    }
  };


  /**
 * Fetches all orders from the database.
 * @returns The list of all orders.
 */
  export const getAllOrdersService = async (): Promise<IOrder[]> => {
    try {
      // Fetch all orders and populate the related details (package, addOns, user)
      const orders = await Order.find()
        .populate("package") // Populate package details
        .populate("user")    // Populate user details
        .populate("addOns"); // Populate addOns details
  
      // Log the orders to check the populated data
      console.log("Orders with populated user:", orders);
  
      if (!orders || orders.length === 0) {
        throw createErrorResponse("No orders found", 404);
      }
  
      return orders;
    } catch (error) {
      throw createErrorResponse("Error fetching all orders", 500);
    }
  };
  