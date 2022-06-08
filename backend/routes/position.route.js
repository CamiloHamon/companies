import { Router } from "express";
import { requiredAuth } from "../middlewares/requireAuth.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import {
	createPosition,
	getPosition,
	getPositions,
	removePosition,
	updatePosition,
} from "../controllers/position.controller.js";
import { bodyPositionValidator } from "../middlewares/validatorManager.js";

const router = Router();

//GET           /api/v1/positions         all positions
//GET           /api/v1/positions/:id     single position
//POST          /api/v1/positions         create position
//PATCH/PUT     /api/v1/positions:id      update position
//DELETE        /api/v1/positions:id      delete position

router.get("/", requiredAuth, isAdmin, getPositions);
router.get("/:id", requiredAuth, isAdmin, getPosition);
router.post(
	"/",
	requiredAuth,
	isAdmin,
	bodyPositionValidator,
	createPosition
);
router.put(
	"/:id",
	requiredAuth,
	isAdmin,
	bodyPositionValidator,
	updatePosition
);
router.delete(
	"/:id",
	requiredAuth,
	isAdmin,
	removePosition
);

export default router;
