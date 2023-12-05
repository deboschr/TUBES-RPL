export const login_page = (req, res) => {
	res.render("login", {
		title: "Login",
		layout: "layouts/main",
		style: "login-style.css",
		script: "login-script.js",
		data_user: "ini data user",
	});
};
