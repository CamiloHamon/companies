import mongoose from "mongoose";

const { Schema, model } = mongoose;

const employeSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	lastname: {
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
	pid: {
		type: Schema.Types.ObjectId,
		ref: "Position",
		required: true,
	},
	cid:{
		type: Schema.Types.ObjectId,
		ref: "Company",
		required: true,
	},
	createdat: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
});

export const Employee = model("Employee", employeSchema);
