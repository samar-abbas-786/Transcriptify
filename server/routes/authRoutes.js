import express from "express";
import { login, signup, getProfile } from "../controllers/authController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import { rateLimitLogin } from "../middleware/rateLimit.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", rateLimitLogin, login);
router.get("/profile", protect, getProfile);
router.get("/admin", protect, isAdmin, (req, res) => res.send("Welcome Admin"));

export default router;
