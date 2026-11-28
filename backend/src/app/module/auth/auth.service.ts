import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/appError";
import type { RegisterPayload } from "./auth.interface";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import config from "../../config";
import crypto from "crypto";
import { UserStatus } from "../../../generated/prisma/enums";
import { jwtUtils } from "../../utils/jwt";
import { SignOptions } from "jsonwebtoken";

const registerUser = async (payload: RegisterPayload) => {
	const { name, password } = payload;
	const email = payload.email.trim().toLowerCase();

	const existingUser = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	if (existingUser) {
		throw new AppError(
			httpStatus.CONFLICT,
			"User with this email already exists",
		);
	}

	const hashedPassword = await bcrypt.hash(
		password,
		Number(config.bcryptSaltRounds),
	);

	const otpValue = crypto.randomInt(100000, 999999).toString();
	const otpKey = `user-registeration-otp-${email}`;

	if (config.node_env === "development") {
		console.log(`OTP for ${email}: ${otpValue}`);
	}

	const expirationSeconds = 5 * 60;
};

const loginUser = async (payload: { email: string; password: string }) => {
	const { email, password } = payload;

	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	if (!user) {
		throw new AppError(httpStatus.UNAUTHORIZED, "User not found");
	}

	if (user.status === UserStatus.DELETED) {
		throw new AppError(httpStatus.UNAUTHORIZED, "User is deleted");
	}

	if (user.status === UserStatus.BLOCKED) {
		throw new AppError(httpStatus.UNAUTHORIZED, "User is blocked");
	}

	const isPasswordValid = await bcrypt.compare(password, user.password);

	if (!isPasswordValid) {
		throw new AppError(httpStatus.UNAUTHORIZED, "Invalid credentials");
	}

	const jwtPayload = {
		userId: user.id,
		email: user.email,
		role: user.role,
		status: user.status,
	};

	const accessToken = jwtUtils.createToken(
		jwtPayload,
		config.jwt_access_secret,
		config.jwt_access_expires_in as SignOptions
	)

	const refreshToken = jwtUtils.createToken(
		jwtPayload,
		config.jwt_refresh_secret,
		config.jwt_refresh_expires_in as SignOptions
	)

	return {
		accessToken,
		refreshToken,
	};
};

export const AuthService = {
	registerUser,
	loginUser
};
