import mongoose from "mongoose";

const { Schema, model } = mongoose;

const rolSchema = new Schema({
	rol: {
		type: String,
		required: true,
		trim: true,
	},
});

export const Rol = model("Rol", rolSchema);
