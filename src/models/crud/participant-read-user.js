import { LecturerModel } from "../participant-model/lecturer-model.js";
import { LecturerCoordinatorModel } from "../participant-model/lecturer-coordinator-model.js";
import { LecturerExaminerModel } from "../participant-model/lecturer-examiner-model.js";
import { LecturerSupervisorModel } from "../participant-model/lecturer-supervisor-model.js";
import { StudentModel } from "../participant-model/student-model.js";

export const ParticipantReadUser = async () => {
	try {
		// Fetch student data
		const students = await StudentModel.findAll({
			attributes: ["npm", "id_supervisor", "name", "study_program"],
		});

		// Fetch lecturer data with roles
		const lecturers = await LecturerModel.findAll({
			attributes: ["nik", "name"],
			include: [
				{
					model: LecturerCoordinatorModel,
					required: false,
					attributes: ["id_coordinator"],
				},
				{
					model: LecturerExaminerModel,
					required: false,
					attributes: ["id_examiner"],
				},
				{
					model: LecturerSupervisorModel,
					required: false,
					attributes: ["id_supervisor"],
				},
			],
		});

		const formattedStudents = students.map((student) => ({
			npm: student.npm,
			name: student.name,
			study_program: student.study_program,
			id_supervisor: student.id_supervisor,
		}));

		const formattedLecturers = lecturers.map((lecturer) => {
			const role = {
				id_coordinator: lecturer?.lecturer_coordinator?.id_coordinator || "",
				id_examiner: lecturer?.lecturer_examiner?.id_examiner || "",
				id_supervisor: lecturer?.lecturer_supervisor?.id_supervisor || "",
			};

			return {
				nik: lecturer.nik,
				name: lecturer.name,
				role,
			};
		});

		return {
			success: true,
			students: formattedStudents,
			lecturers: formattedLecturers,
		};
	} catch (error) {
		console.error(error);
		throw new Error("Error fetching schedule participants");
	}
};
