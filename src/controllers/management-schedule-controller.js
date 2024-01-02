import { ScheduleOverviewRead } from "../models/crud/schedule-overview-read.js";
import { ScheduleDetailRead } from "../models/crud/schedule-detail-read.js";
import { ParticipantRead } from "../models/crud/participant-read.js";
import { ScheduleCreateUpdate } from "../models/crud/schedule-create-update.js";

export const management_schedule_overview_page = async (req, res) => {
	try {
		let filterSchedule = "";
		let filterThesis = "";

		if (req.query.sch && req.query.ths) {
			filterSchedule = req.query.sch;
			filterThesis = req.query.ths;
		}

		const scheduleQuery = await ScheduleOverviewRead(
			filterSchedule,
			filterThesis
		);

		let scheduleData = null;

		if (scheduleQuery.success) {
			scheduleData = scheduleQuery.scheduleData;
		}

		const assets = {
			page_style: "management-schedule-overview-style.css",
			page_script: "management-schedule-overview-script.js",
		};

		res.render("management-schedule-overview-page", {
			title: "Schedule Management",
			layout: "layouts/main",
			assets: assets,
			scheduleData: JSON.stringify(scheduleData),
		});
	} catch (error) {
		console.log(error);
	}
};

export const management_schedule_detail_page = async (req, res) => {
	try {
		let title = "Add New Schedule";

		let scheduleData = null;

		if (
			req.session.scheduleData &&
			req.session.scheduleData.id_schedule !== ""
		) {
			const { id_schedule } = req.session.scheduleData;
			const result = await ScheduleDetailRead(id_schedule);
			if (result.success) {
				scheduleData = {
					scheduleData: result.scheduleData,
					studentData: result.studentData,
					supervisorData: result.supervisorData,
					coordinatorData: result.coordinatorData,
					examinerData: result.examinerData,
				};
				title = "Schedule Data";
			}
		}

		let participantData = await ParticipantRead();

		const assets = {
			page_style: "management-schedule-detail-style.css",
			page_script: "management-schedule-detail-script.js",
			layout_style: "search-user-style.css",
			layout_script: "schedule-search-user-script.js",
		};

		res.render("management-schedule-detail-page", {
			title: title,
			layout: "layouts/main",
			assets: assets,
			scheduleData: JSON.stringify(scheduleData),
			studentData: JSON.stringify(participantData.students),
			supervisorData: JSON.stringify(participantData.supervisors),
			examinerData: JSON.stringify(participantData.examiners),
			coordinatorData: JSON.stringify(participantData.coordinators),
		});
	} catch (error) {
		console.log(error);
	}
};

export const management_schedule_overview = async (req, res) => {
	try {
		const { id_schedule } = req.body;

		if (id_schedule) {
			req.session.scheduleData = {
				id_schedule: id_schedule,
			};
		} else {
			req.session.scheduleData = {
				id_schedule: "",
			};
		}

		res.json({ redirectUrl: "/schedule-management-detail" });
	} catch (error) {
		console.log(error);
	}
};

export const management_schedule_detail = async (req, res) => {
	try {
		const result = await ScheduleCreateUpdate(req.body);

		if (result.success) {
			req.session.scheduleData = {
				id_schedule: result.id_schedule,
			};
		} else {
			req.session.scheduleData = {
				id_schedule: "",
			};
		}
		res.redirect("/schedule-management-detail");
	} catch (error) {
		console.log(error);
	}
};
