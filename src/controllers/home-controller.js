export const home_page = async (req, res) => {
	try {
		const dataUser = {
			role: "coordinator",
			kekuatan: "menggunakan ChatGPT",
		};

		const assets = {
			page_style: "home-style.css",
			page_script: "home-script.js",
		};

		res.render("home-page", {
			title: "Home",
			layout: "layouts/main",
			assets: assets,
			dataUser: dataUser,
		});
	} catch (error) {
		console.log(error);
	}
};
