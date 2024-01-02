import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/connection-database.js";

export const ScheduleExaminerModel = sequelize.define(
	"schedule_examiner",
	{
		id_schedule: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
		},
		id_examiner: {
			type: DataTypes.STRING(20),
			allowNull: false,
			primaryKey: true,
		},
		examiner_role: {
			type: DataTypes.ENUM("head", "team"),
			allowNull: false,
		},
	},
	{
		tableName: "schedule_examiner",
		timestamps: false,
		primaryKey: {
			fields: ["id_schedule", "id_examiner"],
		},
	}
);

sequelize.sync();
