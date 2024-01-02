export function populateTable(tableFor) {
	const dataStudents = JSON.parse(
		document.querySelector(".get-data-students").getAttribute("data-query")
	);
	const dataLecturers = JSON.parse(
		document.querySelector(".get-data-lecturers").getAttribute("data-query")
	);

	const tableBody = document.getElementById("table-body");
	const tableTh1 = document.getElementById("thead-th1");
	const tableTh3 = document.getElementById("thead-th3");
	tableBody.innerHTML = "";
	tableTh1.innerHTML = "";
	tableTh3.innerHTML = "";

	if (tableFor === "students") {
		tableTh1.innerHTML = "NPM";
		tableTh3.innerHTML = "Study Program";
		if (dataStudents && dataStudents.length > 0) {
			dataStudents.forEach((item) => {
				const row = document.createElement("tr");

				const npmCell = document.createElement("td");
				const namaCell = document.createElement("td");
				const studyProgramCell = document.createElement("td");
				const actionCell = document.createElement("td");

				npmCell.textContent = item.npm;
				namaCell.textContent = item.name;
				studyProgramCell.textContent = item.study_program;

				const detailDiv = document.createElement("div");
				const detailIcon = document.createElement("i");
				detailDiv.classList.add("btn-detail");
				detailIcon.classList.add("bx", "bxs-user-detail");
				detailDiv.appendChild(detailIcon);

				const deleteDiv = document.createElement("div");
				const editIconDelete = document.createElement("i");
				deleteDiv.classList.add("btn-delete");
				editIconDelete.classList.add("bx", "bx-trash");
				deleteDiv.appendChild(editIconDelete);

				actionCell.classList.add("center-content");
				actionCell.appendChild(detailDiv);
				actionCell.appendChild(deleteDiv);

				row.appendChild(npmCell);
				row.appendChild(namaCell);
				row.appendChild(studyProgramCell);
				row.appendChild(actionCell);
				tableBody.appendChild(row);

				row.addEventListener("click", function () {
					const npmStudent = npmCell.innerHTML;
					const inputData = {
						idUser: npmStudent,
						model: "student",
					};

					$.ajax({
						url: "/user-management-overview",
						method: "POST",
						data: inputData,
						success: function (response) {
							// Check if the response contains a redirect URL
							if (response && response.redirectUrl) {
								// Redirect to the URL provided in the response
								window.location.href = response.redirectUrl;
							} else {
								// Handle other responses or errors if needed
								console.error("Unexpected response:", response);
							}
						},
						error: function (error) {
							// Handle error if needed
							console.error("Error:", error);
						},
					});
				});
			});
		}
	} else if (tableFor === "lecturers") {
		tableTh1.innerHTML = "NIK";
		tableTh3.innerHTML = "Role";
		if (dataLecturers && dataLecturers.length > 0) {
			dataLecturers.forEach((item) => {
				const row = document.createElement("tr");
				row.setAttribute("idUser", `${item.nik}`);

				const nikCell = document.createElement("td");
				const namaCell = document.createElement("td");
				const roleCell = document.createElement("td");
				const actionCell = document.createElement("td");

				nikCell.textContent = item.nik;
				namaCell.textContent = item.name;
				const roles = [];

				if (item.role.id_coordinator !== "") {
					roles.push("Coordinator");
				}

				if (item.role.id_examiner !== "") {
					roles.push("Examiner");
				}

				if (item.role.id_supervisor !== "") {
					roles.push("Supervisor");
				}

				// Display all roles separated by a comma in roleCell
				roleCell.textContent = roles.join(", ");

				const detailDiv = document.createElement("div");
				const detailIcon = document.createElement("i");
				detailDiv.classList.add("btn-detail");
				detailIcon.classList.add("bx", "bxs-user-detail");
				detailDiv.appendChild(detailIcon);

				const deleteDiv = document.createElement("div");
				const editIconDelete = document.createElement("i");
				deleteDiv.classList.add("btn-delete");
				editIconDelete.classList.add("bx", "bx-trash");
				deleteDiv.appendChild(editIconDelete);

				actionCell.classList.add("center-content");
				actionCell.appendChild(detailDiv);
				actionCell.appendChild(deleteDiv);

				row.appendChild(nikCell);
				row.appendChild(namaCell);
				row.appendChild(roleCell);
				row.appendChild(actionCell);
				tableBody.appendChild(row);

				detailIcon.addEventListener("click", function () {
					const nikLecturer = nikCell.innerHTML;
					const inputData = {
						idUser: nikLecturer,
						model: "lecturer",
					};

					$.ajax({
						url: "/user-management-overview",
						method: "POST",
						data: inputData,
						success: function (response) {
							// Check if the response contains a redirect URL
							if (response && response.redirectUrl) {
								// Redirect to the URL provided in the response
								window.location.href = response.redirectUrl;
							} else {
								// Handle other responses or errors if needed
								console.error("Unexpected response:", response);
							}
						},
						error: function (error) {
							// Handle error if needed
							console.error("Error:", error);
						},
					});
				});
			});
		}
	}
}

document.addEventListener("DOMContentLoaded", function () {
	const studentBtn = document.querySelector(".btn-student");
	const lecturerBtn = document.querySelector(".btn-lecturer");

	// Function to toggle the 'active' class
	function toggleActiveClass(event) {
		// Remove 'active' class from all elements with class 'btn-student' or 'btn-lecturer'
		document
			.querySelectorAll(".btn-student, .btn-lecturer")
			.forEach((element) => {
				element.classList.remove("active");
			});

		// Add 'active' class to the clicked element
		event.target.classList.add("active");
	}

	// Event listeners for button clicks
	studentBtn.addEventListener("click", function (event) {
		toggleActiveClass(event); // Pass the event to the function
		populateTable("students");
	});

	lecturerBtn.addEventListener("click", function (event) {
		toggleActiveClass(event); // Pass the event to the function
		populateTable("lecturers");
	});

	// Simulate a click on studentBtn to set it as default active
	studentBtn.click();
});
