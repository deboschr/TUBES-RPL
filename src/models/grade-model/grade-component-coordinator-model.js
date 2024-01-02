import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/connection-database.js";

export const GradeComponentCoordinatorModel = sequelize.define(
	"grade_component_coordinator",
	{
		id_component: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		id_coordinator: {
			type: DataTypes.STRING(20),
			primaryKey: true,
		},
	},
	{
		tableName: "grade_component_coordinator",
		timestamps: false,
		primaryKey: {
			fields: ["id_component", "id_coordinator"],
		},
	}
);

sequelize.sync();
