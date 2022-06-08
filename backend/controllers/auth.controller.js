import { User } from "../models/User.js";
import { Rol } from "../models/Rol.js";
import {
	generateRefreshToken,
	generateToken,
} from "../utils/tokenManager.js";

export const register = async (req, res) => {
	const { email, password } = req.body;
	try {
		let user = await User.findOne({ email });
		if (!user) {
			const rol = await Rol.findOne({ rol: "admin" });
			let user = new User({ email, password, rid: rol.id });
			await user.save();

			const { token, expiresIn } = generateToken(user._id);
			generateRefreshToken(user._id, res);

			return res.json({ token, expiresIn });
		}

		return res.status(400).json({
			error: "Ya existe este usuario.",
		});
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ error: "Error de servidor" });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if (!user) {
			return res
				.status(403)
				.json({ Error: "No existe el usuario" });
		}

		const responsePassword = await user.comparePassword(
			password
		);

		if (!responsePassword) {
			return res.status(400).json({
				Error: "Credenciales incorrectas.",
			});
		}

		const resUser = {
			name: user.name,
			lastname: user.lastname,
			email: user.email,
			rid: user.rid
		};
		const { token, expiresIn } = generateToken(user._id);
		generateRefreshToken(user._id, res);

		return res.json({ token, expiresIn, user: resUser });
	} catch (error) {
		return res
			.status(500)
			.json({ Error: "Error en el servidor" });
	}
};

export const infoUser = async (req, res) => {
	try {
		const user = await User.findById(req.uid).lean();
		return res.json({ user });
	} catch (error) {
		console.log(error);
	}
};

export const refreshToken = (req, res) => {
	try {
		const uid = req.uid;
		const { token, expiresIn } = generateToken(uid);
		return res.json({ token, expiresIn });
	} catch (error) {
		return res
			.status(500)
			.json({ error: "Error en el servidor" });
	}
};

export const logout = (req, res) => {
	res.clearCookie("refreshToken");
	res.json({ status: true });
};
