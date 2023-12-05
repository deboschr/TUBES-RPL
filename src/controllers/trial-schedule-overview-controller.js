export const trial_schedule_overview_page = (req, res) => {
	res.render("trial-schedule-overview", {
		title: "Jadwal Overview",
		layout: "layouts/main",
		style: "trial-schedule-overview-style.css",
		script: "trial-schedule-overview-script.js",
		data_user: "ini data user",
	});
};
