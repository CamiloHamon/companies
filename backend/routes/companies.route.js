import { Router } from "express";
import { requiredAuth } from "../middlewares/requireAuth.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import {
	createCompany,
	getCompanies,
	getCompany,
	removeCompany,
	updateCompany,
} from "../controllers/companies.controller.js";
import { bodyCompanyValidator } from "../middlewares/validatorManager.js";

const router = Router();

//GET           /api/v1/companies         all companies
//GET           /api/v1/companies/:id     single company
//POST          /api/v1/companies         create company
//PATCH/PUT     /api/v1/companies:id      update company
//DELETE        /api/v1/companies:id      delete company

router.get("/", getCompanies);
router.get("/:id", getCompany);
router.post(
	"/",
	requiredAuth,
	isAdmin,
	bodyCompanyValidator,
	createCompany
);
router.put(
	"/:id",
	requiredAuth,
	isAdmin,
	bodyCompanyValidator,
	updateCompany
);
router.delete("/:id", requiredAuth, isAdmin, removeCompany);

export default router;
