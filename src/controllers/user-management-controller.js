export const user_management_page = (req, res) => {
	res.render("user-management", {
		title: "Manajemen Pengguna",
		layout: "layouts/main",
		style: "user-management-style.css",
		script: "user-management-script.js",
		data_user: "ini data user",
	});
};
