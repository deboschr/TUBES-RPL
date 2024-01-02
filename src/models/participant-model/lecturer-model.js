import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/connection-database.js";

export const LecturerModel = sequelize.define(
	"lecturer",
	{
		nik: {
			type: DataTypes.STRING(20),
			primaryKey: true,
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		tableName: "lecturer",
		timestamps: false,
	}
);

sequelize.sync();
