import app from "./app";
import config from "./app/config";
import { prisma } from "./app/lib/prisma";

const port = config.PORT;

const main = async () => {
	try {
		await prisma.$connect();
		console.log(`Database connected successfully.`);

		app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
	} catch (error) {
		await prisma.$disconnect();
		console.error("Error connecting to the database:", error);
		process.exit(1);
	}
};

main();
