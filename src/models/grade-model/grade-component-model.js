import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/connection-database.js";

export const GradeComponentModel = sequelize.define(
	"grade_component",
	{
		id_component: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		id_grade: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		lecturer_role: {
			type: DataTypes.ENUM(
				"examiner-head",
				"examiner-team",
				"coordinator",
				"supervisor"
			),
			allowNull: true,
		},
		capaian_materi: {
			type: DataTypes.FLOAT,
			allowNull: true,
		},
		penguasaan_materi: {
			type: DataTypes.FLOAT,
			allowNull: true,
		},
		proses_bimbingan: {
			type: DataTypes.FLOAT,
			allowNull: true,
		},
		presentasi: {
			type: DataTypes.FLOAT,
			allowNull: true,
		},
		kedisiplinan: {
			type: DataTypes.FLOAT,
			allowNull: true,
		},
	},
	{
		tableName: "grade_component",
		timestamps: false,
	}
);

sequelize.sync();
