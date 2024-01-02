import { ScheduleModel } from "../schedule-model/schedule-model.js";
import { ScheduleExaminerModel } from "../schedule-model/schedule-examiner-model.js";
import { LecturerModel } from "../participant-model/lecturer-model.js";
import { LecturerCoordinatorModel } from "../participant-model/lecturer-coordinator-model.js";
import { LecturerExaminerModel } from "../participant-model/lecturer-examiner-model.js";
import { LecturerSupervisorModel } from "../participant-model/lecturer-supervisor-model.js";
import { StudentModel } from "../participant-model/student-model.js";

export const ScheduleDetailRead = async (id_schedule) => {
	try {
		// Find schedule data
		const scheduleQuery = await ScheduleModel.findOne({
			where: {
				id_schedule: id_schedule,
			},
			include: [
				{
					model: LecturerCoordinatorModel,
					required: true,
					attributes: ["id_coordinator"],
					include: [
						{
							model: LecturerModel,
							required: true,
							attributes: ["name"],
						},
					],
				},
				{
					model: StudentModel,
					required: true,
					attributes: ["npm", "name"],
					include: [
						{
							model: LecturerSupervisorModel,
							required: true,
							attributes: ["id_supervisor"],
							include: [
								{
									model: LecturerModel,
									required: true,
									attributes: ["name"],
								},
							],
						},
					],
				},
				{
					model: ScheduleExaminerModel,
					attributes: ["examiner_role"],
					include: [
						{
							model: LecturerExaminerModel,
							required: true,
							attributes: ["id_examiner"],
							include: [
								{
									model: LecturerModel,
									required: true,
									attributes: ["name"],
								},
							],
						},
					],
				},
			],
		});
		if (scheduleQuery) {
			const {
				scheduleData,
				studentData,
				supervisorData,
				coordinatorData,
				examinerData,
			} = ScheduleAccessingData(scheduleQuery);

			return {
				success: true,
				scheduleData,
				studentData,
				supervisorData,
				coordinatorData,
				examinerData,
			};
		} else {
			return { success: false, message: "Data not found!" };
		}
	} catch (error) {
		return { success: false, message: error };
	}
};

const ScheduleAccessingData = (scheduleQuery) => {
	const {
		id_schedule,
		date,
		time,
		no_room,
		thesis_phase,
		student,
		lecturer_coordinator,
		schedule_examiners,
	} = scheduleQuery;

	const scheduleData = {
		id_schedule,
		date,
		time,
		no_room,
		thesis_phase,
	};

	const studentData = {
		npm: student.npm,
		name: student.name,
	};

	const supervisorData = {
		id_supervisor: student.lecturer_supervisor.id_supervisor,
		name: student.lecturer_supervisor.lecturer.name,
	};

	const coordinatorData = {
		id_coordinator: lecturer_coordinator.id_coordinator,
		name: lecturer_coordinator.lecturer.name,
	};

	const examinerData = schedule_examiners.map((examiner) => ({
		id_examiner: examiner.lecturer_examiner.id_examiner,
		name: examiner.lecturer_examiner.lecturer.name,
		examiner_role: examiner.examiner_role,
	}));

	return {
		scheduleData,
		studentData,
		supervisorData,
		coordinatorData,
		examinerData,
	};
};
