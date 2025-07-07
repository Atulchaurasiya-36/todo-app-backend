import express from "express"
import { login,register,logout } from "../controller/user.controller.js";

const router=express.Router();
router.post("/signup",register);
router.post("/login",login);
router.get("/logout",logout);

export default router