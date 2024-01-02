import { LecturerModel } from "../participant-model/lecturer-model.js";
import { LecturerCoordinatorModel } from "../participant-model/lecturer-coordinator-model.js";
import { LecturerExaminerModel } from "../participant-model/lecturer-examiner-model.js";
import { LecturerSupervisorModel } from "../participant-model/lecturer-supervisor-model.js";
import { StudentModel } from "../participant-model/student-model.js";

export const ExistingUserCheck = async (email, password) => {
	try {
		let loginData = null;

		let existingStudent = await StudentModel.findOne({
			where: { email: email, password: password },
		});
		let existingLecturer = await LecturerModel.findOne({
			where: { email: email, password: password },
			include: [
				{
					model: LecturerCoordinatorModel,
					required: false,
				},
				{
					model: LecturerExaminerModel,
					required: false,
				},
				{
					model: LecturerSupervisorModel,
					required: false,
				},
			],
		});

		if (existingStudent) {
			loginData = {
				role: "student",
				npm: existingStudent.npm,
				name: existingStudent.name,
				id_supervisor: existingStudent.id_supervisor,
				thesis_topic: existingStudent.thesis_topic,
				study_program: existingStudent.study_program,
			};
		} else if (existingLecturer) {
			loginData = {
				role: "lecturer",
				nik: existingStudent.nik,
				name: existingStudent.name,
				role: {
					id_coordinator: lecturer?.lecturer_coordinator?.id_coordinator || "",
					id_examiner: lecturer?.lecturer_examiner?.id_examiner || "",
					id_supervisor: lecturer?.lecturer_supervisor?.id_supervisor || "",
				},
			};
		} else {
			return { success: false };
		}

		return { success: true, loginData };
	} catch (error) {
		console.error(error);
		return { success: false };
	}
};
