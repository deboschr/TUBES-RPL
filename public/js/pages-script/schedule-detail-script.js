document.addEventListener("DOMContentLoaded", function () {
	const bapButton = document.querySelector(".btn-bap");
	const gradeButton = document.querySelector(".btn-grade");
	const scheduleData = JSON.parse(
		document.querySelector(".data-schedule").getAttribute("data-query")
	);

	setScheduleData(scheduleData);

	bapButton.addEventListener("click", function () {
		$.ajax({
			url: "/schedule-detail",
			method: "POST",
			data: {
				target_page: "bap",
				id_grade: "10",
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
	gradeButton.addEventListener("click", function () {
		$.ajax({
			url: "/schedule-detail",
			method: "POST",
			data: {
				target_page: "grade",
				id_grade: "10",
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

export function setScheduleData(scheduleData) {
	console.log(scheduleData); // Ensure the structure of scheduleData is accurate

	// Hide both boxes initially
	document.getElementById("box-thesis-1").style.display = "none";
	document.getElementById("box-thesis-2").style.display = "none";

	scheduleData.forEach(function (data) {
		let thesis = "1";
		if (data.thesis_phase === "thesis-1") {
			document.getElementById("box-thesis-1").style.display = "flex";
		} else if (data.thesis_phase === "thesis-2") {
			document.getElementById("box-thesis-2").style.display = "flex";
			thesis = "2";
		}

		document.getElementById(`date${thesis}`).innerHTML = data.date || "";
		document.getElementById(`time${thesis}`).innerHTML = data.time || "";
		document.getElementById(`room${thesis}`).innerHTML = data.no_room || "";
		document.getElementById(`thesis-topic${thesis}`).innerHTML =
			(data.student && data.student.thesis_topic) || "";
		document.getElementById(`student${thesis}`).innerHTML =
			(data.student && data.student.name) || "";
		document.getElementById(`supervisor${thesis}`).innerHTML =
			(data.supervisor && data.supervisor.name) || "";
		document.getElementById(`coordinator${thesis}`).innerHTML =
			(data.coordinator && data.coordinator.name) || "";

		if (data.thesis_phase === "thesis-1") {
			document.getElementById(`examiner-head${thesis}`).innerHTML =
				(data.examiner && data.examiner[0] && data.examiner[0].name) || "";
		} else if (data.thesis_phase === "thesis-2") {
			let name1 =
				(data.examiner && data.examiner[0] && data.examiner[0].name) || "";
			if (data.examiner[0].role === "head") {
				document.getElementById(`examiner-head${thesis}`).innerHTML = name1;
			} else {
				document.getElementById(`examiner-team${thesis}`).innerHTML = name1;
			}

			let name2 =
				(data.examiner && data.examiner[1] && data.examiner[1].name) || "";
			if (data.examiner[1].role === "head") {
				document.getElementById(`examiner-head${thesis}`).innerHTML = name2;
			} else {
				document.getElementById(`examiner-team${thesis}`).innerHTML = name2;
			}
		}
	});
}
