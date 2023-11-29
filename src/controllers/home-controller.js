export const home_page = (req, res) => {
	res.render("home", {
		layout: "layouts/main",
	});
};
