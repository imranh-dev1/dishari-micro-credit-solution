import express, {
	type Application,
	type Request,
	type Response,
} from "express";
import cors from "cors";
import config from "./app/config";
import cookieParser from "cookie-parser";
import httpStatus from "http-status";
import { AuthRoutes } from "./app/module/auth/auth.route";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	cors({
		origin: config.frontendURL,
		credentials: true,
	}),
);

app.use(cookieParser());

app.use("/api/auth", AuthRoutes);

app.get("/", (req: Request, res: Response) => {
	res.status(httpStatus.OK).json({
		success: true,
		status: httpStatus.OK,
		message: "Welcome to Dishari micro credit solution API Server..",
	});
});

export default app;
