export const trial_result_page = (req, res) => {
	res.render("trial-result", {
		title: "Hasil Sidang",
		layout: "layouts/main",
		style: "trial-result-style.css",
		script: "trial-result-script.js",
		data_user: "ini data user",
	});
};
