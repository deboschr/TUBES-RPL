import { ScheduleModel } from "../schedule-model/schedule-model.js";
import { ScheduleExaminerModel } from "../schedule-model/schedule-examiner-model.js";
import { LecturerModel } from "../participant-model/lecturer-model.js";
import { LecturerCoordinatorModel } from "../participant-model/lecturer-coordinator-model.js";
import { LecturerExaminerModel } from "../participant-model/lecturer-examiner-model.js";
import { LecturerSupervisorModel } from "../participant-model/lecturer-supervisor-model.js";
import { StudentModel } from "../participant-model/student-model.js";

export const UserScheduleDetailRead = async (scheduleTarget) => {
	try {
		let scheduleQuery = [];

		if (scheduleTarget.npm) {
			scheduleQuery = await ScheduleModel.findAll({
				where: {
					npm: scheduleTarget.npm,
				},
				include: [
					{
						model: StudentModel,
						required: false,
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
					},
					{
						model: LecturerCoordinatorModel,
						required: false,
						include: [
							{
								model: LecturerModel,
								required: false,
							},
						],
					},
					{
						model: ScheduleExaminerModel,
						required: false,
						include: [
							{
								model: LecturerExaminerModel,
								required: false,
								include: [
									{
										model: LecturerModel,
										required: false,
									},
								],
							},
						],
					},
				],
			});
		} else if (scheduleTarget.id_schedule) {
			scheduleQuery = await ScheduleModel.findAll({
				where: {
					id_schedule: scheduleTarget.id_schedule,
				},
				include: [
					{
						model: StudentModel,
						required: false,
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
					},
					{
						model: LecturerCoordinatorModel,
						required: false,
						include: [
							{
								model: LecturerModel,
								required: false,
							},
						],
					},
					{
						model: ScheduleExaminerModel,
						required: false,
						include: [
							{
								model: LecturerExaminerModel,
								required: false,
								include: [
									{
										model: LecturerModel,
										required: false,
									},
								],
							},
						],
					},
				],
			});
		}

		const formattedQuery = scheduleQuery.map((schedule) => {
			const studentInfo = schedule.student
				? {
						npm: schedule.student.npm || null,
						name: schedule.student.name || null,
						thesis_topic: schedule.student.thesis_topic || null,
				  }
				: null;

			const coordinatorInfo = schedule.lecturer_coordinator
				? {
						id_coordinator:
							schedule.lecturer_coordinator.id_coordinator || null,
						name: schedule.lecturer_coordinator.lecturer.name || null,
				  }
				: null;

			const examinerInfo =
				schedule.schedule_examiners && schedule.schedule_examiners.length > 0
					? schedule.schedule_examiners.map((examiner) => ({
							id_examiner: examiner.lecturer_examiner.id_examiner || null,
							name: examiner.lecturer_examiner.lecturer.name || null,
							role: examiner.examiner_role || null,
					  }))
					: null;

			const supervisorInfo =
				schedule.student && schedule.student.lecturer_supervisor
					? {
							id_supervisor:
								schedule.student.lecturer_supervisor.id_supervisor || null,
							name: schedule.student.lecturer_supervisor.lecturer.name || null,
					  }
					: null;

			return {
				id_schedule: schedule.id_schedule || null,
				date: schedule.date || null,
				time: schedule.time || null,
				no_room: schedule.no_room || null,
				thesis_phase: schedule.thesis_phase || null,
				student: studentInfo,
				coordinator: coordinatorInfo,
				examiner: examinerInfo,
				supervisor: supervisorInfo,
			};
		});

		return { success: true, data: formattedQuery };
	} catch (error) {
		return { success: false, message: error.message };
	}
};
