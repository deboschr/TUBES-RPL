export const trial_schedule_management_page = (req, res) => {
	res.render("trial-schedule-management", {
		title: "Manajemen Jadwal",
		layout: "layouts/main",
		style: "trial-schedule-management-style.css",
		script: "trial-schedule-management-script.js",
		data_user: "ini data user",
	});
};
