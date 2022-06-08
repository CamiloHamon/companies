import { Rol } from "../models/Rol.js";
import { User } from "../models/User.js";

export const isAdmin = async (req, res, next) => {
	try {
		const uid = req.uid;
		const user = await User.findById(uid);

		const rol = await Rol.findById(user.rid);
		
		if (rol.rol === process.env.ADMIN_ALIAS) {
			next();
			return;
		}

		return res
			.status(403)
			.json({ message: "Require Admin" });
	} catch (error) {
		return res.status(500).json({
			error: "error en el servidor",
		});
	}
};
