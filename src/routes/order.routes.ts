import express from "express";
import { handleCreateOrder,handleGetAllOrders,handleGetOrdersByUserId } from "../controllers/order.controller";

const router = express.Router();

router.post("/create", handleCreateOrder);
router.get("/getAllorders", handleGetAllOrders);


router.get("/getOrderByUserId/:userId", handleGetOrdersByUserId);  // Fetch orders by userId

export default router;
