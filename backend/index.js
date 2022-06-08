import "dotenv/config";
import "./database/connectdb.js";
import cookieParser from "cookie-parser";
import express from "express";
import authRoute from "./routes/auth.route.js";
import companyRoute from "./routes/companies.route.js";
import employeRoute from "./routes/employee.route.js";
import positionRoute from "./routes/position.route.js";
import cors from "cors";
//import linkRouter from "./routes/link.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/companies", companyRoute);
app.use("/api/v1/employees", employeRoute);
app.use("/api/v1/positions", positionRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
	console.log(`Server on port: ${PORT}`)
);
