import express, { Router } from "express";
import * as healthCheckController from "../controllers/healthCheckController";

const router: Router = express.Router();

router.get("/", healthCheckController.healthCheck);

export default router;
