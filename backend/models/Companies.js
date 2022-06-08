import mongoose from "mongoose";

const { Schema, model } = mongoose;

const companiesSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	address: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true,
		lowercase: true,
		index: { unique: true },
	},
	createdat: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
});

export const Companies = model(
	"Companies",
	companiesSchema
);
