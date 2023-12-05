export const home_page = (req, res) => {
	res.render("home", {
		title: "Home",
		layout: "layouts/main",
		style: "home-style.css",
		script: "home-script.js",
		data_user: "ini data user",
	});
};
