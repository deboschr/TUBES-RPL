import { ScheduleModel } from "../schedule-model/schedule-model.js";
import { ScheduleExaminerModel } from "../schedule-model/schedule-examiner-model.js";
import { StudentModel } from "../participant-model/student-model.js";

export const UserScheduleOverviewRead = async (userData) => {
	try {
		let scheduleQuery = [];

		if (userData.nik) {
			if (userData.role.id_coordinator) {
				const cooScheduleQuery = await ScheduleModel.findAll({
					where: {
						id_coordinator: userData.role.id_coordinator,
					},
					include: [
						{
							model: StudentModel,
							required: false,
						},
					],
				});

				const formattedQuery = cooScheduleQuery.map((schedule) => ({
					id_schedule: schedule.id_schedule,
					date: schedule.date,
					time: schedule.time,
					no_room: schedule.no_room,
					thesis_phase: schedule.thesis_phase,
					role: "Coordinator",
					student: {
						npm: schedule.student.npm,
						name: schedule.student.name,
					},
				}));

				scheduleQuery = scheduleQuery.concat(formattedQuery);
			}

			if (userData.role.id_examiner) {
				const exaScheduleQuery = await ScheduleExaminerModel.findAll({
					where: {
						id_examiner: userData.role.id_examiner,
					},
					include: [
						{
							model: ScheduleModel,
							required: false,
							include: [
								{
									model: StudentModel,
									required: false,
								},
							],
						},
					],
				});

				const formattedQuery = exaScheduleQuery.map((scheduleExa) => ({
					id_schedule: scheduleExa.schedule.id_schedule,
					date: scheduleExa.schedule.date,
					time: scheduleExa.schedule.time,
					no_room: scheduleExa.schedule.no_room,
					thesis_phase: scheduleExa.schedule.thesis_phase,
					role: "Examiner",
					student: {
						npm: scheduleExa.schedule.student.npm,
						name: scheduleExa.schedule.student.name,
					},
				}));

				scheduleQuery = scheduleQuery.concat(formattedQuery);
			}

			if (userData.role.id_supervisor) {
				const supScheduleQuery = await StudentModel.findAll({
					where: {
						id_supervisor: userData.role.id_supervisor,
					},
					include: [
						{
							model: ScheduleModel,
							required: false,
						},
					],
				});

				const formattedQuery = supScheduleQuery.map((scheduleSup) => ({
					id_schedule: scheduleSup.schedules[0].id_schedule,
					date: scheduleSup.schedules[0].date,
					time: scheduleSup.schedules[0].time,
					no_room: scheduleSup.schedules[0].no_room,
					thesis_phase: scheduleSup.schedules[0].thesis_phase,
					role: "Supervisor",
					student: {
						npm: scheduleSup.npm,
						name: scheduleSup.name,
					},
				}));

				scheduleQuery = scheduleQuery.concat(formattedQuery);
			}
		} else if (userData.npm) {
			const stuScheduleQuery = await ScheduleModel.findAll({
				where: {
					npm: userData.npm,
				},
				include: [
					{
						model: StudentModel,
						required: false,
					},
				],
			});

			const formattedQuery = stuScheduleQuery.map((schedule) => ({
				id_schedule: schedule.id_schedule,
				date: schedule.date,
				time: schedule.time,
				no_room: schedule.no_room,
				thesis_phase: schedule.thesis_phase,
				role: "Coordinator",
				student: {
					npm: schedule.student.npm,
					name: schedule.student.name,
				},
			}));

			scheduleQuery = scheduleQuery.concat(formattedQuery);
		}

		return { success: true, data: scheduleQuery };
	} catch (error) {
		return { success: false, message: error.message };
	}
};
