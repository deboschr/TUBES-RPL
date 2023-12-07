export const trial_schedule_page = (req, res) => {
	res.render("trial-schedule", {
		title: "Jadwal",
		layout: "layouts/main",
		style: "trial-schedule-style.css",
		script: "trial-schedule-script.js",
		data_user: "ini data user",
	});
};
