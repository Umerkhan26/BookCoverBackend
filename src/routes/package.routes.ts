import express from "express";
import { getPackagesByPage, createPackage } from "../controllers/package.controller";

const router = express.Router();

router.get("/getPackagesByPage", getPackagesByPage);
router.post("/createPackage", createPackage);

export default router;
