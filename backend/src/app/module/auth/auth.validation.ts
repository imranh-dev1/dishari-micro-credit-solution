import { z } from "zod";

const registerSchema = z
	.object({
		// User fields
		email: z.string().trim().email("Invalid email address").toLowerCase(),

		password: z
			.string()
			.min(8, "Password must be at least 8 characters")
			.max(64, "Password must not exceed 64 characters"),

		confirmPassword: z.string(),

		// Employee fields
		name: z.string().trim().min(2, "Name must be at least 2 characters"),

		fotherName: z.string().trim().min(2, "Father's name is required"),

		motherName: z.string().trim().min(2, "Mother's name is required"),

		phone: z
			.string()
			.trim()
			.regex(/^01[3-9]\d{8}$/, "Invalid Bangladeshi phone number"),

		address: z.string().trim().min(5, "Address must be at least 5 characters"),

		nationalID: z
			.string()
			.trim()
			.regex(/^(10|13|17)\d{7,14}$/, "Invalid National ID"),

		designation: z.string().trim().min(2, "Designation is required"),

		salary: z.coerce
			.number()
			.positive("Salary must be greater than 0")
			.finite("Invalid salary"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export const authValidation = {
	register: registerSchema,
};
