document.addEventListener("DOMContentLoaded", function () {
	const bapButton = document.querySelector(".btn-bap");
	const gradeButton = document.querySelector(".btn-grade");

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
					console.log("BABIBABI");
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
