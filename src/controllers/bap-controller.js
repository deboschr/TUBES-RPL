export const bap_overview_page = async (req, res) => {
	try {
		const assets = {
			page_style: "bap-overview-style.css",
			page_script: "bap-overview-script.js",
		};
		res.render("bap-overview-page", {
			title: "BAP Overview",
			layout: "layouts/main",
			assets: assets,
		});
	} catch (error) {
		console.log(error);
	}
};
export const bap_detail_page = async (req, res) => {
	try {
		const assets = {
			page_style: "bap-detail-style.css",
			page_script: "bap-detail-script.js",
		};
		res.render("bap-detail-page", {
			title: "BAP Detail",
			layout: "layouts/main",
			assets: assets,
		});
	} catch (error) {
		console.log(error);
	}
};

export const bap_overview = async (req, res) => {
	try {
	} catch (error) {
		console.log(error);
	}
};
export const bap_detail = async (req, res) => {
	try {
	} catch (error) {
		console.log(error);
	}
};
