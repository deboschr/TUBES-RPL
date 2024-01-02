document.addEventListener("DOMContentLoaded", function () {
	const scheduleData = JSON.parse(
		document.querySelector(".data-schedule").getAttribute("data-query")
	);

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
			const roleCell = document.createElement("td");
			const studentNameCell = document.createElement("td");

			dateCell.textContent = item.date;
			timeCell.textContent = item.time;
			thesisPhaseCell.textContent = item.thesis_phase;
			roleCell.textContent = item.role;
			studentNameCell.textContent = item.student.name;

			row.appendChild(dateCell);
			row.appendChild(timeCell);
			row.appendChild(thesisPhaseCell);
			row.appendChild(roleCell);
			row.appendChild(studentNameCell);
			tableBody.appendChild(row);

			row.addEventListener("click", function () {
				$.ajax({
					url: "/schedule-overview",
					method: "POST",
					data: {
						id_schedule: item.id_schedule,
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
		});
	}
}
