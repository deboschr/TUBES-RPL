document.addEventListener("DOMContentLoaded", function () {
	const inputButton = document.querySelector(".btn-input");
	const gradeData = JSON.parse(
		document.querySelector(".grade-data").getAttribute("data-query")
	);

	populateTable(gradeData);

	inputButton.addEventListener("click", function () {
		$.ajax({
			url: "/grade-detail",
			method: "POST",
			data: {
				lecture_role: "examiner",
				id_lecturer: "XXXXXXX",
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

export function populateTable(gradeData) {
	const tableBody = document.getElementById("table-body");

	tableBody.innerHTML = "";

	if (gradeData.grade_components && gradeData.grade_components.length > 0) {
		gradeData.grade_components.forEach((item) => {
			const row = document.createElement("tr");

			const evaluatorCell = document.createElement("td");
			const nilaiCell = document.createElement("td");
			const bobotCell = document.createElement("td");
			const nilaiAkhirCell = document.createElement("td");

			evaluatorCell.textContent = item.lecturer_role;

			// Calculate the average grade based on the given grade components
			const averageGrade = calculateAverageGrade(item);
			nilaiCell.textContent = averageGrade;

			// Assign the weight percentage based on evaluator role
			if (item.lecturer_role === "Examiner Head") {
				bobotCell.textContent = "35%";
			} else if (item.lecturer_role === "Examiner Team") {
				bobotCell.textContent = "35%";
			} else if (item.lecturer_role === "Supervisor") {
				bobotCell.textContent = "20%";
			} else if (item.lecturer_role === "Coordinator") {
				bobotCell.textContent = "10%";
			}

			// Calculate the final grade as a weighted average
			const weightedGrade =
				(parseFloat(bobotCell.textContent) / 100) * averageGrade;
			nilaiAkhirCell.textContent = weightedGrade.toFixed(2); // Adjust the number of decimal places as needed

			row.appendChild(evaluatorCell);
			row.appendChild(nilaiCell);
			row.appendChild(bobotCell);
			row.appendChild(nilaiAkhirCell);
			tableBody.appendChild(row);
		});
	}
}

function calculateAverageGrade(gradeComponent) {
	const {
		capaian_materi,
		penguasaan_materi,
		proses_bimbingan,
		presentasi,
		kedisiplinan,
	} = gradeComponent;

	// Sum up the grades
	const totalGrade =
		capaian_materi +
		penguasaan_materi +
		proses_bimbingan +
		presentasi +
		kedisiplinan;

	// Calculate the average
	const numberOfComponents = Object.keys(gradeComponent).length - 3; // Subtracting id_component, id_grade, and lecturer_role
	const averageGrade = totalGrade / numberOfComponents;

	return averageGrade;
}
