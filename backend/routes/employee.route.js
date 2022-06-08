import { Router } from "express";
import {
	createEmployee,
	getAllEmployees,
	getEmployee,
	getEmployessByCompanyId,
	removeEmployee,
	updateEmployee,
} from "../controllers/employees.controller.js";
import { requiredAuth } from "../middlewares/requireAuth.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { bodyEmployeeValidator } from "../middlewares/validatorManager.js";

const router = Router();

//GET           /api/v1/employees                   all employees
//GET           /api/v1/employees/:id               single employee
//GET           /api/v1/employees/companyId/:id     single employee
//POST          /api/v1/employees                   create employee
//PATCH/PUT     /api/v1/employees:id                update employee
//DELETE        /api/v1/employees:id                delete employee

router.get("/", requiredAuth, isAdmin, getAllEmployees);
router.get("/:id", requiredAuth, isAdmin, getEmployee);
router.get("/companyId/:id", getEmployessByCompanyId);
router.post(
	"/",
	requiredAuth,
	isAdmin,
	bodyEmployeeValidator,
	createEmployee
);
router.put(
	"/:id",
	requiredAuth,
	isAdmin,
	bodyEmployeeValidator,
	updateEmployee
);
router.delete(
	"/:id",
	requiredAuth,
	isAdmin,
	removeEmployee
);

export default router;
