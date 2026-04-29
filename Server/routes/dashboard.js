import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
    

const router = express.Router();

router.get("/summary", authMiddleware,)

export default router;