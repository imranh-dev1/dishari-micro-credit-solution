import { prisma } from "../../lib/prisma";
import { AppError } from "../../utils/appError";
import { RegisterPayload } from "./auth.interface";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import config from "../../config";
import crypto from "crypto";

const registerUser = async (payload: RegisterPayload) => {
    const { name, password } = payload;
    const email = payload.email.trim().toLowerCase();

    const existingUser = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (existingUser) {
        throw new AppError(httpStatus.CONFLICT, "User with this email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, Number(config.bcryptSaltRounds));

    const otpValue = crypto.randomInt(100000, 999999).toString();
    const otpKey = `user-registeration-otp-${email}`;

    if (config.node_env === "development") {
        console.log(`OTP for ${email}: ${otpValue}`);
    }

    const expirationSeconds = 5 * 60;

}


export const AuthService = {
    registerUser,
};