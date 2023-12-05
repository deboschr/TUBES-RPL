export const bap_attachment_page = (req, res) => {
	res.render("bap-attachment", {
		title: "Lampiran BAP",
		layout: "layouts/main",
		style: "bap-attachment-style.css",
		script: "bap-attachment-script.js",
		data_user: "ini data user",
	});
};
