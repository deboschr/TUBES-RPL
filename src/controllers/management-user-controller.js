import { ParticipantReadUser } from "../models/crud/participant-read-user.js";
import { ParticipantRead } from "../models/crud/participant-read.js";
import { UserRead } from "../models/crud/user-read.js";
import { UserCreateUpdate } from "../models/crud/user-create-update.js";

export const management_user_overview_page = async (req, res) => {
	try {
		const { students, lecturers } = await ParticipantReadUser();

		const assets = {
			page_style: "management-user-overview-style.css",
			page_script: "management-user-overview-script.js",
		};

		res.render("management-user-overview-page", {
			title: "User Management Overview",
			layout: "layouts/main",
			assets: assets,
			dataStudents: students,
			dataLecturers: lecturers,
		});
	} catch (error) {
		console.log(error);
	}
};

export const management_user_detail_page = async (req, res) => {
	try {
		let title = "Add New User";
		let userData = null;

		if (req.session.inputData) {
			const { idUser, model } = req.session.inputData;
			userData = await UserRead(idUser, model);
			// req.session.inputData = null;
			title = "User Data";
		}

		let participantData = await ParticipantRead();

		const assets = {
			page_style: "management-user-detail-style.css",
			page_script: "management-user-detail-script.js",
			layout_style: "search-user-style.css",
			layout_script: "search-user-script.js",
		};

		res.render("management-user-detail-page", {
			title: title,
			layout: "layouts/main",
			assets: assets,
			userData: JSON.stringify(userData),
			studentData: JSON.stringify(participantData.students),
			supervisorData: JSON.stringify(participantData.supervisors),
			examinerData: JSON.stringify(participantData.examiners),
			coordinatorData: JSON.stringify(participantData.coordinators),
		});
	} catch (error) {
		console.log(error);
	}
};

export const management_user_overview = async (req, res) => {
	try {
		const { idUser, model } = req.body;
		if (idUser && model) {
			req.session.inputData = {
				idUser: idUser,
				model: model,
			};
		}

		res.json({ redirectUrl: "/user-management-detail" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};

export const management_user_detail = async (req, res) => {
	try {
		const crudResult = await UserCreateUpdate(req.body);

		if (crudResult.success) {
			req.session.inputData = crudResult.inputData;
		}

		res.redirect("/user-management-detail");
	} catch (error) {
		console.log(error);
	}
};
