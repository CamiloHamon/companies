import { Companies } from "../models/Companies.js";
import { Employee } from "../models/Employee.js";

export const getCompanies = async (req, res) => {
	try {
		const companies = await Companies.find();

		return res.json({ companies });
	} catch (error) {
		return res.status(500).json({
			error: "error de servidor",
		});
	}
};

export const getCompany = async (req, res) => {
	try {
		const { id } = req.params;
		const company = await Companies.findById(id);

		if (!company) {
			return res.status(404).json({
				error: "No existe la empresa.",
			});
		}

		return res.json({ company });
	} catch (error) {
		return res.status(500).json({
			error: "error de servidor",
		});
	}
};

export const createCompany = async (req, res) => {
	try {
		const uid = req.uid;
		const { name, address, email } = req.body;

		const company = new Companies({
			name,
			address,
			email,
			createdat: uid,
		});

		await company.save();

		return res.status(201).json({ company });
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

export const removeCompany = async (req, res) => {
	try {
		const { id } = req.params;

		const companies = await Companies.findById(id);
		if (!companies) {
			return res.status(404).json({
				error: "No existe la empresa.",
			});
		}

		const employess = await Employee.find({cid: id});
		if(employess.length > 0){
			return res.status(404).json({
				error: "La empresa tiene empleados asociados.",
			});
		}

		await companies.remove();

		return res.status(201).json({ status: "ok" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			error: "error de servidor",
		});
	}
};

export const updateCompany = async (req, res) => {
	try {
		const { id } = req.params;

		const company = await Companies.findById(id);
		if (!company) {
			return res.status(404).json({
				error: "No existe la empresa",
			});
		}

		const { name, address, email } = req.body;

		company.name = name;
		company.address = address;
		company.email = email;

		await company.save();

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
