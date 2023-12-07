export const trial_result_overview_page = (req, res) => {
	res.render("trial-result-overview", {
		title: "Hasil Sidang Overview",
		layout: "layouts/main",
		style: "trial-result-overview-style.css",
		script: "trial-result-overview-script.js",
		data_user: "ini data user",
	});
};
