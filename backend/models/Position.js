import mongoose from "mongoose";

const { Schema, model } = mongoose;

const positionSchema = new Schema({
	position: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		index: { unique: true },
	},
	description: {
		type: String,
		required: true,
		trim: true,
	},
});

export const Position = model("Position", positionSchema);
