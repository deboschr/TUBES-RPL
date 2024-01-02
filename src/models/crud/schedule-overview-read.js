import { ScheduleModel } from "../schedule-model/schedule-model.js";
import { StudentModel } from "../participant-model/student-model.js";

export const ScheduleOverviewRead = async (filterSchedule, filterThesis) => {
	try {
		let scheduleQuery = [];
		let currentDate = new Date();

		if (
			(filterSchedule === "" && filterThesis === "") ||
			(filterSchedule === "all" && filterThesis === "all")
		) {
			scheduleQuery = await ScheduleModel.findAll({
				include: [
					{
						model: StudentModel,
						required: true,
						attributes: ["npm", "name"],
					},
				],
			});
		} else {
			if (filterSchedule === "all") {
				if (filterThesis === "thesis1" || filterThesis === "thesis2") {
					scheduleQuery = await ScheduleModel.findAll({
						where: {
							thesis_phase:
								filterThesis === "thesis1" ? "thesis-1" : "thesis-2",
						},
						include: [
							{
								model: StudentModel,
								required: true,
								attributes: ["npm", "name"],
							},
						],
					});
				}
			} else if (filterSchedule === "done" || filterSchedule === "coming") {
				let filterDate =
					filterSchedule === "done"
						? { $lt: currentDate }
						: { $gt: currentDate };
				if (filterThesis === "thesis1" || filterThesis === "thesis2") {
					scheduleQuery = await ScheduleModel.findAll({
						where: {
							date: filterDate,
							thesis_phase:
								filterThesis === "thesis1" ? "thesis-1" : "thesis-2",
						},
						include: [
							{
								model: StudentModel,
								required: true,
								attributes: ["npm", "name"],
							},
						],
					});
				}
			}
		}

		let scheduleData = scheduleQuery.map((schedule) => {
			return {
				id_schedule: schedule.id_schedule,
				date: schedule.date,
				time: schedule.time,
				thesis_phase: schedule.thesis_phase,
				student_name: schedule.student.name,
			};
		});

		return {
			success: true,
			scheduleData: scheduleData,
		};
	} catch (error) {
		return { success: false, scheduleData: null, message: error };
	}
};
