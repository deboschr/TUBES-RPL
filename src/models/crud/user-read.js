import { LecturerModel } from "../participant-model/lecturer-model.js";
import { LecturerCoordinatorModel } from "../participant-model/lecturer-coordinator-model.js";
import { LecturerExaminerModel } from "../participant-model/lecturer-examiner-model.js";
import { LecturerSupervisorModel } from "../participant-model/lecturer-supervisor-model.js";
import { StudentModel } from "../participant-model/student-model.js";

export const UserRead = async (idUser, model) => {
	try {
		let result;

		switch (model) {
			case "student":
				const student = await StudentModel.findOne({
					where: {
						npm: idUser,
					},
					include: [
						{
							model: LecturerSupervisorModel,
							required: false,
							include: [
								{
									model: LecturerModel,
									required: false,
								},
							],
						},
					],
				});

				if (!student) {
					throw new Error("Student not found");
				}

				result = {
					data_for: "student",
					npm: student.npm,
					name: student.name,
					email: student.email,
					password: student.password,
					thesis_topic: student.thesis_topic,
					supervisor: {
						id_supervisor: student.lecturer_supervisor
							? student.lecturer_supervisor.id_supervisor
							: null,
						name: student.lecturer_supervisor
							? student.lecturer_supervisor.lecturer.name
							: null,
					},
				};
				break;
			case "lecturer":
				const lecturer = await LecturerModel.findOne({
					where: {
						nik: idUser,
					},
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

				if (!lecturer) {
					throw new Error("Lecturer not found");
				}

				const role = {
					id_coordinator: lecturer?.lecturer_coordinator?.id_coordinator || "",
					id_examiner: lecturer?.lecturer_examiner?.id_examiner || "",
					id_supervisor: lecturer?.lecturer_supervisor?.id_supervisor || "",
				};

				result = {
					data_for: "lecturer",
					nik: lecturer.nik,
					name: lecturer.name,
					email: lecturer.email,
					password: lecturer.password,
					role,
				};
				break;
			default:
				throw new Error("Invalid model provided");
		}

		return result;
	} catch (error) {
		console.error("Error in UserRead:", error);
		throw new Error("Error fetching user");
	}
};
