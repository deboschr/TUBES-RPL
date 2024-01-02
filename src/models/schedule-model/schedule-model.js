import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/connection-database.js";

export const ScheduleModel = sequelize.define(
	"schedule",
	{
		id_schedule: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		id_coordinator: {
			type: DataTypes.STRING(20),
			allowNull: false,
		},
		npm: {
			type: DataTypes.STRING(20),
			allowNull: false,
		},
		date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		time: {
			type: DataTypes.TIME,
			allowNull: false,
		},
		no_room: {
			type: DataTypes.STRING(20),
			allowNull: true,
		},
		thesis_phase: {
			type: DataTypes.ENUM("sidang-1", "sidang-2"),
			allowNull: false,
		},
	},
	{
		tableName: "schedule",
		timestamps: false,
	}
);

sequelize.sync();
