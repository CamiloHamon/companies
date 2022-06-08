import { Employee } from "../models/Employee.js";
import { Position } from "../models/Position.js";

export const getPositions = async (req, res) => {
	try {
		const positions = await Position.find();

		return res.json({ positions });
	} catch (error) {
		return res.status(500).json({
			error: "error de servidor",
		});
	}
};

export const getPosition = async (req, res) => {
	try {
		const { id } = req.params;
		const position = await Position.findById(id);

		if (!position) {
			return res.status(404).json({
				error: "No existe el cargo.",
			});
		}

		return res.json({ position });
	} catch (error) {
		return res.status(500).json({
			error: "error de servidor",
		});
	}
};

export const createPosition = async (req, res) => {
	try {
		const { name, description } = req.body;

		const position = new Position({
			position: name,
			description
		});

		await position.save();

		return res.status(201).json({ position });
	} catch (error) {
		if (error.code === 11000) {
			return res.status(404).json({
				error: "El cargo ya existe.",
			});
		}
		return res.status(500).json({
			error: "error de servidor",
		});
	}
};

export const removePosition = async (req, res) => {
	try {
		const { id } = req.params;

		const position = await Position.findById(id);
		if (!position) {
			return res.status(404).json({
				error: "No existe el cargo.",
			});
		}

		const employess = await Employee.find({pid: id});
		if(employess.length > 0){
			return res.status(404).json({
				error: "El cargo tiene empleados asociados.",
			});
		}

		await position.remove();
		
		return res.status(201).json({ status: "ok" });
	} catch (error) {
		return res.status(500).json({
			error: "error de servidor",
		});
	}
};

export const updatePosition = async (req, res) => {
	try {
		const { id } = req.params;

		const position = await Position.findById(id);
		if (!position) {
			return res.status(404).json({
				error: "No existe el cargo.",
			});
		}

		const { name, description } = req.body;

		position.position = name;
		position.description = description;

		await position.save();

		return res.status(201).json({ status: "ok" });
	} catch (error) {
		if (error.code === 11000) {
			return res.status(404).json({
				error: "El cargo ya existe.",
			});
		}
		return res.status(500).json({
			error: "error de servidor",
		});
	}
};
