import express from "express";
import { User } from "../models/user.js";
import { login, register, getMyProfile,logout } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();


router.post("/login",login);
router.get("/logout",logout);
 
 router.get("/me",isAuthenticated,getMyProfile) 
 
 router.post("/new",register);

 export default router;
 