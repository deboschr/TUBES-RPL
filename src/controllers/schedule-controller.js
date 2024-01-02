import { UserScheduleOverviewRead } from "../models/crud/user-schedule-overview-read.js";
import { UserScheduleDetailRead } from "../models/crud/user-schedule-detail-read.js";

export const schedule_overview_page = async (req, res) => {
	try {
		req.session.userData = {
			nik: "123456704",
			name: "Cecilia Esti Nugraheni",
			role: {
				id_coordinator: "123456704C",
				id_examiner: "123456704E",
				id_supervisor: "123456704S",
			},
		};
		// req.session.userData = {
		// 	npm: "6182001064",
		// };

		let scheduleData = null;
		const scheduleQuery = await UserScheduleOverviewRead(req.session.userData);
		if (scheduleQuery.success) {
			scheduleData = scheduleQuery.data;
		}

		const assets = {
			page_style: "schedule-overview-style.css",
			page_script: "schedule-overview-script.js",
		};

		res.render("schedule-overview-page", {
			title: "Schedule Overview",
			layout: "layouts/main",
			assets: assets,
			scheduleData: JSON.stringify(scheduleData),
		});
	} catch (error) {
		console.log(error);
	}
};

export const schedule_detail_page = async (req, res) => {
	try {
		req.session.userData = {
			npm: "6182001064",
		};

		// req.session.scheduleTarget = {
		// 	id_schedule: "10",
		// };

		let scheduleData = null;
		if (
			req.session.scheduleTarget &&
			req.session.scheduleTarget.id_schedule !== ""
		) {
			scheduleData = await UserScheduleDetailRead({
				id_schedule: req.session.scheduleTarget.id_schedule,
			});
		} else {
			scheduleData = await UserScheduleDetailRead({
				npm: req.session.userData.npm,
			});
		}

		console.log(scheduleData);

		const assets = {
			page_style: "schedule-detail-style.css",
			page_script: "schedule-detail-script.js",
		};

		res.render("schedule-detail-page", {
			title: "Schedule Detail",
			layout: "layouts/main",
			assets: assets,
			scheduleData: JSON.stringify(scheduleData.data),
		});
	} catch (error) {
		console.log(error);
	}
};

export const schedule_overview = async (req, res) => {
	try {
		const { id_schedule } = req.body;

		if (id_schedule) {
			req.session.scheduleTarget = {
				id_schedule: id_schedule,
			};
		}

		res.json({ redirectUrl: "/schedule-detail" });
	} catch (error) {
		console.log(error);
	}
};

export const schedule_detail = async (req, res) => {
	try {
		const { target_page, id_grade } = req.body;

		if (target_page && id_grade) {
			if (target_page === "bap") {
				res.json({ redirectUrl: "/bap" });
			} else if (target_page === "grade") {
				res.json({ redirectUrl: "/grade" });
			}
		}
	} catch (error) {
		console.log(error);
	}
};
