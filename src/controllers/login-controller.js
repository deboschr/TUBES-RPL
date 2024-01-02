import { ExistingUserCheck } from "../models/crud/existing-user-check.js";

export const login_page = async (req, res) => {
	try {
		const assets = {
			page_style: "login-style.css",
			page_script: "login-script.js",
		};
		res.render("login-page", {
			title: "login",
			layout: "layouts/main",
			assets: assets,
		});
	} catch (error) {
		console.log(error);
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		// const hashedPassword = crypto
		// 	.createHash("sha256")
		// 	.update(password)
		// 	.digest("base64");

		const existingUser = await ExistingUserCheck(email, password);

		if (existingUser.success) {
			req.session.loginData = existingUser.loginData;
			res.redirect("/home");
		} else {
			res.redirect("/login");
		}
	} catch (error) {
		res.status(500).send("Login gagal");
	}
};

export const logout = (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			res.status(500).send("Logout failed");
		} else {
			res.redirect("/login");
		}
	});
};
