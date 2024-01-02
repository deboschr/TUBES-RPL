document.addEventListener("DOMContentLoaded", function () {
	const getDataUserElement = document.querySelector(".get-data-user");
	const dataUserAttributeValue = getDataUserElement.getAttribute("data-user");
	const scheduleLink = document.querySelector("#link-schedule");
	const gradeLink = document.querySelector("#link-grade");

	if (dataUserAttributeValue) {
		const dataUser = JSON.parse(dataUserAttributeValue);

		if (dataUser.role === "student") {
			scheduleLink.setAttribute("href", "/schedule-detail");
			gradeLink.setAttribute("href", "/grade-detail");
		}
	}
});
