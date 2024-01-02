import { Sequelize } from "sequelize";

const sequelize = new Sequelize("tubes_rpl_v1", "root", "", {
	host: "localhost",
	dialect: "mysql",
	logging: false,
});

// Coba koneksi ke database
(async () => {
	try {
		await sequelize.authenticate();
		console.log("Connection to database has been established successfully.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
})();

export { sequelize };
