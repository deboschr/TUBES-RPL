import { LecturerModel } from "../participant-model/lecturer-model.js";
import { LecturerCoordinatorModel } from "../participant-model/lecturer-coordinator-model.js";
import { LecturerExaminerModel } from "../participant-model/lecturer-examiner-model.js";
import { LecturerSupervisorModel } from "../participant-model/lecturer-supervisor-model.js";
import { StudentModel } from "../participant-model/student-model.js";

export const UserCreateUpdate = async (userData) => {
	try {
		let inputData;
		if (userData.npm !== "" && userData.nik === "") {
			const existingData = await StudentModel.findByPk(userData.npm);
			if (existingData) {
				await StudentModel.update(
					{
						name: userData.name,
						email: userData.email,
						password: userData.password,
						thesis_topic: userData.thesis_topic,
						studi_program: userData.studi_program,
						id_supervisor: userData.id_supervisor,
					},
					{
						where: { npm: userData.npm },
					}
				);
			} else {
				await StudentModel.create({
					npm: userData.npm,
					name: userData.name,
					email: userData.email,
					password: userData.password,
					thesis_topic: userData.thesis_topic,
					id_supervisor: userData.id_supervisor,
				});
			}
			inputData = {
				idUser: userData.npm,
				model: "student",
			};
		} else if (userData.npm === "" && userData.nik !== "") {
			const existingData = await LecturerModel.findByPk(userData.nik);
			if (existingData) {
				await LecturerModel.update(
					{
						name: userData.name,
						email: userData.email,
						password: userData.password,
					},
					{
						where: { nik: userData.nik },
					}
				);

				if (!userData.coordinator) {
					await LecturerCoordinatorModel.destroy({
						where: { nik: userData.nik },
					});
				}
				if (!userData.examiner) {
					await LecturerExaminerModel.destroy({
						where: { nik: userData.nik },
					});
				}
				if (!userData.supervisor) {
					await LecturerSupervisorModel.destroy({
						where: { nik: userData.nik },
					});
				}
			} else {
				await LecturerModel.create({
					nik: userData.nik,
					name: userData.name,
					email: userData.email,
					password: userData.password,
				});
				if (userData.coordinator) {
					await LecturerCoordinatorModel.create({
						nik: userData.nik,
						id_coordinator: userData.nik + "C",
					});
				}
				if (userData.examiner) {
					await LecturerExaminerModel.create({
						nik: userData.nik,
						id_examiner: userData.nik + "E",
					});
				}
				if (userData.supervisor) {
					await LecturerSupervisorModel.create({
						nik: userData.nik,
						id_supervisor: userData.nik + "S",
					});
				}
			}
			inputData = {
				idUser: userData.nik,
				model: "lecturer",
			};
		}

		return { success: true, inputData: inputData };
	} catch (error) {
		return { success: false, message: error.message };
	}
};
