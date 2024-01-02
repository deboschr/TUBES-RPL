import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/connection-database.js";

export const LecturerCoordinatorModel = sequelize.define(
	"lecturer_coordinator",
	{
		id_coordinator: {
			type: DataTypes.STRING(20),
			primaryKey: true,
		},
		nik: {
			type: DataTypes.STRING(20),
			allowNull: false,
		},
	},
	{
		tableName: "lecturer_coordinator",
		timestamps: false,
	}
);

sequelize.sync();
