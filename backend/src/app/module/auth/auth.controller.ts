import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthService } from "./auth.service";

const registerUser = catchAsync(async (req: Request, res: Response) => {
	const payload = req.body;

	await AuthService.registerUser(payload);

	sendResponse(res, {
		statusCode: 201,
		success: true,
		message: "User registered successfully",
		data: null,
	});
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
	const payload = req.body;

	const result = await AuthService.loginUser(payload);

	sendResponse(res, {
		statusCode: 200,
		success: true,
		message: "User logged in successfully",
		data: result,
	});
});

export const AuthController = {
	registerUser,
	loginUser,
};
