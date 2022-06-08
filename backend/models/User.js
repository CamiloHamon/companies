import bcryptjs from "bcryptjs";
import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true,
		lowercase: true,
		index: { unique: true },
	},
	name: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
	},
	lastname: {
		type: String,
		required: true,
		trim: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
	},
	rid: {
		type: Schema.Types.ObjectId,
		ref: "Rol",
		required: true,
	},
});

userSchema.pre("save", async function (next) {
	const user = this;
	if (!user.isModified("password")) return next();
	try {
		const salt = await bcryptjs.genSalt(10);
		user.password = await bcryptjs.hash(
			user.password,
			salt
		);
		next();
	} catch (error) {
		throw new Error(
			"Fallo al hacer el hash de la contrasena"
		);
	}
});

userSchema.methods.comparePassword = async function (
	candidatePassword
) {
	return await bcryptjs.compare(
		candidatePassword,
		this.password
	);
};

export const User = model("user", userSchema);
