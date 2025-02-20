import express from "express";
import { createOrder, getUserOrders, getOrderById } from "../controllers/order.controller";

const router = express.Router();

router.post("/create", createOrder);
router.get("/user/:userId", getUserOrders);
router.get("/:id", getOrderById);

export default router;
