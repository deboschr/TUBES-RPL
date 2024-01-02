import { ScheduleModel } from "../schedule-model/schedule-model.js";
import { ScheduleExaminerModel } from "../schedule-model/schedule-examiner-model.js";

export const ScheduleCreateUpdate = async (scheduleData) => {
	try {
		// Destructure data input
		const {
			scheduleID,
			studentNPM,
			coordinatorID,
			scheduleDate,
			scheduleTime,
			scheduleRoom,
			scheduleThesisPhase,
			examinerHeadID,
			examinerTeamID,
		} = scheduleData;

		// Cek apakah data schedule sudah ada berdasarkan id_schedule
		const existingSchedule = await ScheduleModel.findByPk(scheduleID);

		let scheduleCRUD = null;

		if (existingSchedule) {
			// Jika sudah ada, lakukan pembaruan (UPDATE) data jadwal
			scheduleCRUD = await ScheduleModel.update(
				{
					id_coordinator: coordinatorID,
					npm: studentNPM,
					date: scheduleDate,
					time: scheduleTime,
					no_room: scheduleRoom,
					thesis_phase: scheduleThesisPhase,
				},
				{
					where: { id_schedule: scheduleID },
				}
			);

			if (examinerHeadID == "") {
				await ScheduleExaminerModel.destroy({
					where: { id_schedule: scheduleID, examiner_role: "head" },
				});
			} else {
				// Perbarui data examiner
				await ScheduleExaminerModel.update(
					{
						id_examiner: examinerHeadID,
					},
					{
						where: { id_schedule: scheduleID, examiner_role: "head" },
					}
				);
			}

			if (examinerTeamID == "") {
				await ScheduleExaminerModel.destroy({
					where: { id_schedule: scheduleID, examiner_role: "team" },
				});
			} else {
				// Perbarui data examiner
				await ScheduleExaminerModel.update(
					{
						id_examiner: examinerTeamID,
					},
					{
						where: { id_schedule: scheduleID, examiner_role: "team" },
					}
				);
			}

			scheduleCRUD = {
				id_schedule: scheduleID,
			};
		} else {
			// Jika belum ada, buat data jadwal baru (CREATE)
			scheduleCRUD = await ScheduleModel.create({
				id_coordinator: coordinatorID,
				npm: studentNPM,
				date: scheduleDate,
				time: scheduleTime,
				no_room: scheduleRoom,
				thesis_phase: scheduleThesisPhase,
			});

			// Buat data examiner baru
			await ScheduleExaminerModel.create({
				id_schedule: scheduleCRUD.id_schedule,
				id_examiner: examinerHeadID,
				examiner_role: "head",
			});

			await ScheduleExaminerModel.create({
				id_schedule: scheduleCRUD.id_schedule,
				id_examiner: examinerTeamID,
				examiner_role: "team",
			});
		}

		return { success: true, id_schedule: scheduleCRUD.id_schedule };
	} catch (error) {
		return { success: false, message: error.message };
	}
};
