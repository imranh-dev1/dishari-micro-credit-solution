import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
	node_env: process.env.NODE_ENV,
	PORT: process.env.PORT,
	frontendURL: process.env.FRONTEND_URL,
	databaseURL: process.env.DATABASE_URL,
	bcryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS,
};
