import express from "express";
import { createAddOn, getAddOnsByPage } from "../controllers/addOn.controller";

const router = express.Router();

router.post("/createAddOn", createAddOn);
router.get("/getByPage/:page", getAddOnsByPage);

export default router;
