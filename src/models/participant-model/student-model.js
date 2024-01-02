import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/connection-database.js";

export const StudentModel = sequelize.define(
	"student",
	{
		npm: {
			type: DataTypes.STRING(20),
			primaryKey: true,
		},
		id_supervisor: {
			type: DataTypes.STRING(20),
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		thesis_topic: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		study_program: {
			type: DataTypes.STRING,
			allowNull: true,
		},
	},
	{
		tableName: "student",
		timestamps: false,
	}
);

sequelize.sync();
