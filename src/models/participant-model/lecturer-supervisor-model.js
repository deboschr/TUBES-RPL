import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/connection-database.js";

export const LecturerSupervisorModel = sequelize.define(
	"lecturer_supervisor",
	{
		id_supervisor: {
			type: DataTypes.STRING(20),
			primaryKey: true,
		},
		nik: {
			type: DataTypes.STRING(20),
			allowNull: false,
		},
	},
	{
		tableName: "lecturer_supervisor",
		timestamps: false,
	}
);

sequelize.sync();
