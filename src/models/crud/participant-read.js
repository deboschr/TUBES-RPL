import { LecturerModel } from "../participant-model/lecturer-model.js";
import { LecturerCoordinatorModel } from "../participant-model/lecturer-coordinator-model.js";
import { LecturerExaminerModel } from "../participant-model/lecturer-examiner-model.js";
import { LecturerSupervisorModel } from "../participant-model/lecturer-supervisor-model.js";
import { StudentModel } from "../participant-model/student-model.js";

export const ParticipantRead = async () => {
	try {
		// Mengambil data mahasiswa
		const students = await StudentModel.findAll({
			attributes: ["npm", "id_supervisor", "name", "study_program"],
		});

		// Mengambil data dosen supervisor
		const supervisors = await LecturerSupervisorModel.findAll({
			attributes: ["id_supervisor"],
			include: [
				{
					model: LecturerModel,
					required: true,
					attributes: ["nik", "name"],
				},
			],
		});

		// Mengambil data dosen koordinator
		const coordinators = await LecturerCoordinatorModel.findAll({
			attributes: ["id_coordinator"],
			include: [
				{
					model: LecturerModel,
					required: true,
					attributes: ["nik", "name"],
				},
			],
		});

		// Mengambil data dosen examiner
		const examiners = await LecturerExaminerModel.findAll({
			attributes: ["id_examiner"],
			include: [
				{
					model: LecturerModel,
					required: true,
					attributes: ["nik", "name"],
				},
			],
		});

		const formattedStudents = students.map((student) => ({
			npm: student.npm,
			id_supervisor: student.id_supervisor,
			name: student.name,
			study_program: student.study_program,
		}));

		const formattedSupervisors = supervisors.map((supervisor) => ({
			id_supervisor: supervisor.id_supervisor,
			nik: supervisor.lecturer.nik,
			name: supervisor.lecturer.name,
		}));

		const formattedCoordinators = coordinators.map((coordinator) => ({
			id_coordinator: coordinator.id_coordinator,
			nik: coordinator.lecturer.nik,
			name: coordinator.lecturer.name,
		}));

		const formattedExaminers = examiners.map((examiner) => ({
			id_examiner: examiner.id_examiner,
			nik: examiner.lecturer.nik,
			name: examiner.lecturer.name,
		}));

		// Mengembalikan semua data yang telah diambil
		return {
			students: formattedStudents,
			supervisors: formattedSupervisors,
			coordinators: formattedCoordinators,
			examiners: formattedExaminers,
		};
	} catch (error) {
		console.error(error);
		throw new Error("Error fetching schedule participants");
	}
};
