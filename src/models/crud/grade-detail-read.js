import { GradeModel } from "../grade-model/grade-model.js";
import { GradeComponentModel } from "../grade-model/grade-component-model.js";
import { ScheduleModel } from "../schedule-model/schedule-model.js";

export const GradeDetailRead = async (id_grade) => {
	try {
		const gradeQuery = await GradeModel.findAll({
			where: { id_grade: id_grade },
			include: [
				{
					model: GradeComponentModel,
					required: false,
				},
				{
					model: ScheduleModel,
					required: false,
				},
			],
		});

		const formattedQuery = gradeQuery.map((grade) => {
			const formattedGrade = {
				id_grade: grade.id_grade,
				id_schedule: grade.id_schedule,
				bap: grade.bap,
				grade_components: grade.grade_components.map((component) => ({
					id_component: component.id_component,
					id_grade: component.id_grade,
					lecturer_role: component.lecturer_role,
					capaian_materi: component.capaian_materi,
					penguasaan_materi: component.penguasaan_materi,
					proses_bimbingan: component.proses_bimbingan,
					presentasi: component.presentasi,
					kedisiplinan: component.kedisiplinan,
				})),
				schedule: {
					id_schedule: grade.schedule.id_schedule,
					id_coordinator: grade.schedule.id_coordinator,
					npm: grade.schedule.npm,
					date: grade.schedule.date,
					time: grade.schedule.time,
					no_room: grade.schedule.no_room,
					thesis_phase: grade.schedule.thesis_phase,
				},
			};
			return formattedGrade;
		});

		console.log(formattedQuery[0]);

		return { success: true, formattedQuery: formattedQuery[0] };
	} catch (error) {
		console.error(error);
		return { success: false };
	}
};
