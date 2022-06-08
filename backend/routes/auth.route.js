import express from "express";
import {
	infoUser,
	login,
	register,
	refreshToken,
	logout,
} from "../controllers/auth.controller.js";
import { requiredAuth } from "../middlewares/requireAuth.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";
import {
	bodyLoginValidator,
	bodyRegisterValidator,
} from "../middlewares/validatorManager.js";

const router = express.Router();

router.post("/register", bodyRegisterValidator, register);

router.post("/login", bodyLoginValidator, login);

//router.get("/protected", requiredAuth, infoUser);

//.get("/refresh", requireRefreshToken, refreshToken);
router.get("/logout", requiredAuth, logout);

export default router;
