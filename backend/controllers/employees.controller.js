import mongoose from "mongoose";
import { Companies } from "../models/Companies.js";
import { Employee } from "../models/Employee.js";
import { Position } from "../models/Position.js";

export const getAllEmployees = async (req, res) => {
	try {
		const employees = await Employee.aggregate([
			{
				$lookup: {
					from: "positions",
					localField: "pid",
					foreignField: "_id",
					as: "position",
				},
			},
			{
				$lookup: {
					from: "companies",
					localField: "cid",
					foreignField: "_id",
					as: "company",
				},
			},
		]);
		return res.json({ employees });
	} catch (error) {
		return res.status(500).json({
			error: "error de servidor",
		});
	}
};

export const getEmployee = async (req, res) => {
	try {
		const { id } = req.params;

		const employee = await Employee.aggregate([
			{
				$match: {
					_id: new mongoose.Types.ObjectId(id),
				},
			},
			{
				$lookup: {
					from: "positions",
					localField: "pid",
					foreignField: "_id",
					as: "position",
				},
			},
			{
				$lookup: {
					from: "companies",
					localField: "cid",
					foreignField: "_id",
					as: "company",
				},
			},
		]);

		if (employee.length === 0) {
			return res.status(404).json({
				error: "No existe el empleado",
			});
		}

		return res.json({ employee: employee[0] });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error: "error de servidor",
		});
	}
};

export const getEmployessByCompanyId = async (req, res) => {
	try {
		const { id } = req.params;

		const company = await Companies.findById(id);
		if (!company) {
			return res.status(404).json({
				error: "No existe la empresa.",
			});
		}

		const employees = await Employee.aggregate([
			{
				$match: {
					cid: new mongoose.Types.ObjectId(id),
				},
			},
			{
				$lookup: {
					from: "positions",
					localField: "pid",
					foreignField: "_id",
					as: "position",
				},
			},
		]);

		return res.json({ employees });
	} catch (error) {
		return res.status(500).json({
			error: "error de servidor",
		});
	}
};

export const createEmployee = async (req, res) => {
	try {
		const uid = req.uid;
		const { name, lastname, email, pid, cid } = req.body;

		const position = await Position.findById(pid);
		if (!position) {
			return res.status(404).json({
				error: "No existe el cargo.",
			});
		}

		const company = await Companies.findById(cid);
		if (!company) {
			return res.status(404).json({
				error: "No existe la empresa.",
			});
		}

		const employee = new Employee({
			name,
			lastname,
			email,
			pid: position.id,
			cid: company.id,
			createdat: uid,
		});

		await employee.save();

		return res.status(201).json({ employee });
	} catch (error) {
		if (error.code === 11000) {
			return res.status(404).json({
				error: "El correo ya está en uso.",
			});
		}
		return res.status(500).json({
			error: "error de servidor",
		});
	}
};

export const removeEmployee = async (req, res) => {
	try {
		const { id } = req.params;

		const employee = await Employee.findById(id);
		if (!employee) {
			return res.status(404).json({
				error: "No existe el empleado.",
			});
		}

		await employee.remove();

		return res.status(201).json({ status: "ok" });
	} catch (error) {
		return res.status(500).json({
			error: "error de servidor",
		});
	}
};

export const updateEmployee = async (req, res) => {
	try {
		const { id } = req.params;

		const employee = await Employee.findById(id);
		if (!employee) {
			return res.status(404).json({
				error: "No existe el empleado.",
			});
		}

		const { name, lastname, email, pid, cid } = req.body;

		const position = await Position.findById(pid);
		if (!position) {
			return res.status(404).json({
				error: "No existe el cargo.",
			});
		}

		const company = await Companies.findById(cid);
		if (!company) {
			return res.status(404).json({
				error: "No existe la empresa.",
			});
		}

		employee.name = name;
		employee.lastname = lastname;
		employee.email = email;
		employee.pid = position.id;
		employee.cid = company.id;

		await employee.save();

		return res.status(201).json({ status: "ok" });
	} catch (error) {
		if (error.code === 11000) {
			return res.status(404).json({
				error: "El correo ya está en uso.",
			});
		}
		return res.status(500).json({
			error: "error de servidor",
		});
	}
};
