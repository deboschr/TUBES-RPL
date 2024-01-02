import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/connection-database.js";

export const GradeModel = sequelize.define(
	"grade",
	{
		id_grade: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		id_schedule: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		bap: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		tableName: "grade",
		timestamps: false,
	}
);

sequelize.sync();
