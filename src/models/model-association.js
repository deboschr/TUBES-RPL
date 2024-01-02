import { sequelize } from "../../config/connection-database.js";
import { LecturerModel } from "./participant-model/lecturer-model.js";
import { LecturerCoordinatorModel } from "./participant-model/lecturer-coordinator-model.js";
import { LecturerSupervisorModel } from "./participant-model/lecturer-supervisor-model.js";
import { LecturerExaminerModel } from "./participant-model/lecturer-examiner-model.js";
import { StudentModel } from "./participant-model/student-model.js";
import { GradeModel } from "./grade-model/grade-model.js";
import { GradeComponentModel } from "./grade-model/grade-component-model.js";
import { GradeComponentCoordinatorModel } from "./grade-model/grade-component-coordinator-model.js";
import { GradeComponentExaminerModel } from "./grade-model/grade-component-examiner-model.js";
import { GradeComponentSupervisorModel } from "./grade-model/grade-component-supervisor-model.js";
import { ScheduleModel } from "./schedule-model/schedule-model.js";
import { ScheduleExaminerModel } from "./schedule-model/schedule-examiner-model.js";

// ######################################################################
/**
 * Hubungan antar model pada participant model
 */
function participantAssociation() {
	// Define associations between LecturerCoordinatorModel and LecturerModel
	LecturerCoordinatorModel.belongsTo(LecturerModel, {
		foreignKey: "nik",
		targetKey: "nik",
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	});

	LecturerModel.hasOne(LecturerCoordinatorModel, {
		foreignKey: "nik",
		sourceKey: "nik",
	});

	// Define associations between LecturerSupervisorModel and LecturerModel
	LecturerSupervisorModel.belongsTo(LecturerModel, {
		foreignKey: "nik",
		targetKey: "nik",
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	});

	LecturerModel.hasOne(LecturerSupervisorModel, {
		foreignKey: "nik",
		sourceKey: "nik",
	});

	// Define associations between LecturerExaminerModel and LecturerModel
	LecturerExaminerModel.belongsTo(LecturerModel, {
		foreignKey: "nik",
		targetKey: "nik",
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	});

	LecturerModel.hasOne(LecturerExaminerModel, {
		foreignKey: "nik",
		sourceKey: "nik",
	});

	// Define associations between StudentModel and LecturerSupervisorModel
	StudentModel.belongsTo(LecturerSupervisorModel, {
		foreignKey: "id_supervisor",
		targetKey: "id_supervisor",
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	});

	LecturerSupervisorModel.hasMany(StudentModel, {
		foreignKey: "id_supervisor",
		sourceKey: "id_supervisor",
	});
}

// ######################################################################
/**
 * Hubungan antar model pada schedule model
 */
function scheduleAssociation() {
	// Define the association between ScheduleExaminerModel and ScheduleModel

	ScheduleExaminerModel.belongsTo(ScheduleModel, {
		foreignKey: "id_schedule",
		targetKey: "id_schedule",
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	});

	ScheduleModel.hasMany(ScheduleExaminerModel, {
		foreignKey: "id_schedule",
		sourceKey: "id_schedule",
	});
}

// ######################################################################
/**
 * Hubungan antar model pada grade model
 */

function gradeAssociation() {
	// Define the association between GradeComponentModel and GradeModel

	GradeComponentModel.belongsTo(GradeModel, {
		foreignKey: "id_grade",
		targetKey: "id_grade",
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	});

	GradeModel.hasMany(GradeComponentModel, {
		foreignKey: "id_grade",
		sourceKey: "id_grade",
	});

	// Define the association between GradeComponentCoordinatorModel and GradeComponentModel

	GradeComponentCoordinatorModel.belongsTo(GradeComponentModel, {
		foreignKey: "id_component",
		targetKey: "id_component",
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	});

	GradeComponentModel.hasMany(GradeComponentCoordinatorModel, {
		foreignKey: "id_component",
		sourceKey: "id_component",
	});

	// Define the association between GradeComponentExaminerModel and GradeComponentModel

	GradeComponentExaminerModel.belongsTo(GradeComponentModel, {
		foreignKey: "id_component",
		targetKey: "id_component",
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	});

	GradeComponentModel.hasMany(GradeComponentExaminerModel, {
		foreignKey: "id_component",
		sourceKey: "id_component",
	});

	// Define the association between GradeComponentSupervisorModel and GradeComponentModel

	GradeComponentSupervisorModel.belongsTo(GradeComponentModel, {
		foreignKey: "id_component",
		targetKey: "id_component",
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	});

	GradeComponentModel.hasMany(GradeComponentSupervisorModel, {
		foreignKey: "id_component",
		sourceKey: "id_component",
	});
}

// ######################################################################
/**
 * Hubungan antar model pada schedule model dan participant model
 */

function scheduleParticipantAssociation() {
	// Define the association between ScheduleModel and StudentModel

	ScheduleModel.belongsTo(StudentModel, {
		foreignKey: "npm",
		targetKey: "npm",
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	});

	StudentModel.hasMany(ScheduleModel, {
		foreignKey: "npm",
		sourceKey: "npm",
	});

	// Define the association between ScheduleModel and LecturerCoordinatorModel

	ScheduleModel.belongsTo(LecturerCoordinatorModel, {
		foreignKey: "id_coordinator",
		targetKey: "id_coordinator",
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	});

	LecturerCoordinatorModel.hasMany(ScheduleModel, {
		foreignKey: "id_coordinator",
		sourceKey: "id_coordinator",
	});

	// Define the association between ScheduleExaminerModel and LecturerExaminerModel

	ScheduleExaminerModel.belongsTo(LecturerExaminerModel, {
		foreignKey: "id_examiner",
		targetKey: "id_examiner",
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	});

	LecturerExaminerModel.hasMany(ScheduleExaminerModel, {
		foreignKey: "id_examiner",
		sourceKey: "id_examiner",
	});
}

/**
 * Hubungan antar model pada schedule model dan grade model
 */

function scheduleGradeAssociation() {
	// Define the association between GradeModel and ScheduleModel

	GradeModel.belongsTo(ScheduleModel, {
		foreignKey: "id_schedule",
		targetKey: "id_schedule",
		onDelete: "CASCADE",
		onUpdate: "CASCADE",
	});

	ScheduleModel.hasOne(GradeModel, {
		foreignKey: "id_schedule",
		sourceKey: "id_schedule",
	});
}

participantAssociation();
scheduleAssociation();
gradeAssociation();
scheduleParticipantAssociation();
scheduleGradeAssociation();

sequelize.sync();
