import express from "express";
import { createAddOn, getAddOns, getAddOnsByPage } from "../controllers/addOn.controller";

const router = express.Router();

router.post("/createAddOn", createAddOn);
router.get("/getByPage/:page", getAddOnsByPage);
router.get("/getaddOnsByPackageId:packageId", getAddOns);

export default router;
