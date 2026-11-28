import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
	node_env: process.env.NODE_ENV,
	PORT: process.env.PORT,
	frontendURL: process.env.FRONTEND_URL!,
	databaseURL: process.env.DATABASE_URL!,
	bcryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS!,
	jwt_access_secret: process.env.JWT_ACCESS_TOKEN_SECRET!,
	jwt_refresh_secret: process.env.JWT_REFRESH_TOKEN_SECRET!,
	jwt_access_expires_in: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN!,
	jwt_refresh_expires_in: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN!,
};
