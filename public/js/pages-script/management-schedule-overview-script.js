document.addEventListener("DOMContentLoaded", function () {
	const scheduleFilter = document.querySelector("#filter-schedule");
	const thesisFilter = document.querySelector("#filter-thesis-phase");
	const addButton = document.querySelector(".btn-add-user");

	const scheduleData = JSON.parse(
		document.querySelector(".get-schedule-data").getAttribute("data-query")
	);

	// Function to filter the table based on selected options
	function filterTable() {
		const selectedSchedule = scheduleFilter.value;
		const selectedThesisPhase = thesisFilter.value;

		const filterData = {
			sch: selectedSchedule,
			ths: selectedThesisPhase,
		};

		$.ajax({
			url: "/schedule-management-overview",
			method: "GET",
			data: filterData,
		});
	}

	addButton.addEventListener("click", function () {
		$.ajax({
			url: "/schedule-management-overview",
			method: "POST",
			data: {
				id_schedule: "",
			},
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

	// Event listeners for filter change
	scheduleFilter.addEventListener("change", filterTable);
	thesisFilter.addEventListener("change", filterTable);

	// Initial population of the table with all data
	populateTable(scheduleData);
});

export function populateTable(scheduleFilterData) {
	const tableBody = document.getElementById("table-body");

	tableBody.innerHTML = "";

	if (scheduleFilterData && scheduleFilterData.length > 0) {
		scheduleFilterData.forEach((item) => {
			const row = document.createElement("tr");

			const dateCell = document.createElement("td");
			const timeCell = document.createElement("td");
			const thesisPhaseCell = document.createElement("td");
			const studentNameCell = document.createElement("td");
			const actionCell = document.createElement("td");

			dateCell.textContent = item.date;
			timeCell.textContent = item.time;
			thesisPhaseCell.textContent = item.thesis_phase;
			studentNameCell.textContent = item.student_name;

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

			row.appendChild(dateCell);
			row.appendChild(timeCell);
			row.appendChild(thesisPhaseCell);
			row.appendChild(studentNameCell);
			row.appendChild(actionCell);
			tableBody.appendChild(row);

			row.addEventListener("click", function () {
				const scheduleData = {
					id_schedule: item.id_schedule,
				};

				$.ajax({
					url: "/schedule-management-overview",
					method: "POST",
					data: scheduleData,
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
