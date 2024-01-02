import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/connection-database.js";

export const GradeComponentExaminerModel = sequelize.define(
	"grade_component_examiner",
	{
		id_component: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		id_examiner: {
			type: DataTypes.STRING(20),
			primaryKey: true,
		},
	},
	{
		tableName: "grade_component_examiner",
		timestamps: false,
		primaryKey: {
			fields: ["id_component", "id_examiner"],
		},
	}
);

sequelize.sync();
