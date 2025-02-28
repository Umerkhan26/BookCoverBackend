import express from "express";
import { getPackagesByPage, createPackage } from "../controllers/package.controller";

const router = express.Router();

router.get("/getPackagesByPage", getPackagesByPage);
router.get("/getPackagesByPage/:page", getPackagesByPage);  // Use :page as URL parameter

export default router;
