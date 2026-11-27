import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { authValidation } from "./auth.validation";
import { AuthController } from "./auth.controller";

const router = Router();

router.post(
	"register",
	validateRequest(authValidation.register),
	AuthController.registerUser,
);
