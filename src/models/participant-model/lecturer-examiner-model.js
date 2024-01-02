import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/connection-database.js";

export const LecturerExaminerModel = sequelize.define(
	"lecturer_examiner",
	{
		id_examiner: {
			type: DataTypes.STRING(20),
			primaryKey: true,
		},
		nik: {
			type: DataTypes.STRING(20),
			allowNull: false,
		},
	},
	{
		tableName: "lecturer_examiner",
		timestamps: false,
	}
);

sequelize.sync();
