import { GradeDetailRead } from "../models/crud/grade-detail-read.js";

export const grade_overview_page = async (req, res) => {
	try {
		const assets = {
			page_style: "grade-overview-style.css",
			page_script: "grade-overview-script.js",
		};
		res.render("grade-overview-page", {
			title: "Nilai Overview",
			layout: "layouts/main",
			assets: assets,
		});
	} catch (error) {
		console.log(error);
	}
};

export const grade_detail_page = async (req, res) => {
	try {
		req.session.gradeTarget = {
			id_grade: "5",
		};

		const gradeQuery = await GradeDetailRead(req.session.gradeTarget.id_grade);
		let gradeData = null;
		if (gradeQuery.success) {
			gradeData = gradeQuery.formattedQuery;
		}

		const assets = {
			page_style: "grade-detail-style.css",
			page_script: "grade-detail-script.js",
		};
		res.render("grade-detail-page", {
			title: "Nilai Detail",
			layout: "layouts/main",
			assets: assets,
			gradeData: JSON.stringify(gradeData),
		});
	} catch (error) {
		console.log(error);
	}
};

export const grade_input_page = async (req, res) => {
	try {
		const assets = {
			page_style: "grade-input-style.css",
			page_script: "grade-input-script.js",
		};

		res.render("grade-input-page", {
			title: "Input Nilai",
			layout: "layouts/main",
			assets: assets,
		});
	} catch (error) {
		console.log(error);
	}
};

export const grade_overview = async (req, res) => {
	try {
		const { lecture_role, id_lecturer } = req.body;

		req.session.scheduleTarget = {
			lecture_role: lecture_role,
			id_lecturer: id_lecturer,
		};

		res.json({ redirectUrl: "/grade-input" });
	} catch (error) {
		console.log(error);
	}
};

export const grade_detail = async (req, res) => {
	try {
		const { lecture_role, id_lecturer } = req.body;

		req.session.scheduleTarget = {
			lecture_role: lecture_role,
			id_lecturer: id_lecturer,
		};

		res.json({ redirectUrl: "/grade-input" });
	} catch (error) {
		console.log(error);
	}
};

export const grade_input = async (req, res) => {
	try {
		const { lecture_role, id_lecturer } = req.body;

		req.session.scheduleTarget = {
			lecture_role: lecture_role,
			id_lecturer: id_lecturer,
		};

		res.json({ redirectUrl: "/grade-input" });
	} catch (error) {
		console.log(error);
	}
};
