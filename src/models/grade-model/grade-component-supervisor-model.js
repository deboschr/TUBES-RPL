import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/connection-database.js";

export const GradeComponentSupervisorModel = sequelize.define(
	"grade_component_supervisor",
	{
		id_component: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		id_supervisor: {
			type: DataTypes.STRING(20),
			primaryKey: true,
		},
	},
	{
		tableName: "grade_component_supervisor",
		timestamps: false,
		primaryKey: {
			fields: ["id_component", "id_supervisor"],
		},
	}
);

sequelize.sync();
