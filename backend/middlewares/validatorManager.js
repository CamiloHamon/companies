import axios from "axios";
import { validationResult } from "express-validator";
import { body } from "express-validator";

export const validationResultExpress = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({
			errors: errors.array(),
		});
	}
	next();
};

export const bodyRegisterValidator = [
	body("email", "Formato email incorrecto")
		.trim()
		.isEmail()
		.normalizeEmail(),
	body("password", "Minimo 6 caracteres")
		.trim()
		.isLength({ min: 6 }),
	body("password", "Contrasena invalida").custom(
		(value, { req }) => {
			if (value !== req.body.repassword) {
				throw new Error("No coinciden las contrasenas.");
			}
			return value;
		}
	),
	validationResultExpress,
];

export const bodyLoginValidator = [
	[
		body("email", "Formato email incorrecto")
			.trim()
			.isEmail()
			.normalizeEmail(),
		body("password", "Minimo 6 caracteres")
			.trim()
			.isLength({ min: 6 }),
	],
	validationResultExpress,
];

export const bodyCompanyValidator = [
	[
		body("email", "Formato email incorrecto")
			.trim()
			.isEmail()
			.normalizeEmail(),
		body("name", "Minimo 3 caracteres")
			.trim()
			.isLength({ min: 3 }),
		body("address", "Minimo 3 caracteres")
			.trim()
			.isLength({ min: 3 }),
	],
	validationResultExpress,
];

export const bodyEmployeeValidator = [
	[
		body("email", "Formato email incorrecto")
			.trim()
			.isEmail()
			.normalizeEmail(),
		body("name", "Minimo 3 caracteres")
			.trim()
			.isLength({ min: 3 }),
		body("lastname", "Minimo 3 caracteres")
			.trim()
			.isLength({ min: 3 }),
	],
	validationResultExpress,
];

export const bodyPositionValidator = [
	[
		body("name", "Minimo 3 caracteres")
			.trim()
			.isLength({ min: 3 }),
	],
	validationResultExpress,
];

export const bodyLinkValidator = [
	body("longLink", "Formato link incorrecto")
		.trim()
		.notEmpty()
		.exists()
		.custom(async (value) => {
			try {
				if (!value.startsWith("https://"))
					value = `https://${value}`;
				await axios.get(value);
				return value;
			} catch (error) {
				throw new Error("Not found longLink 404");
			}
		}),
	validationResultExpress,
];
