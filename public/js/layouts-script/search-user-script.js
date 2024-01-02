import {
	getParticipantsData,
	setParticipantsData,
} from "../pages-script/management-user-detail-script.js";

let searchFor = "search-student";
export function setSearchFor(searchValue) {
	searchFor = searchValue;
}
export function getSearchFor() {
	return { searchFor };
}
export function openModal() {
	const openModalBtn = document.querySelectorAll(".add-icon, .swap-icon");
	const modal = document.getElementById("modal");
	openModalBtn.forEach((btn) => {
		// When the user clicks the button, open the modal
		btn.addEventListener("click", function (event) {
			modal.style.display = "flex";
			document.body.classList.add("modal-open");

			// Check if the clicked button contains a specific class
			if (event.target.classList.contains("search-coordinator")) {
				setSearchFor("search-coordinator");
			} else if (event.target.classList.contains("search-supervisor")) {
				setSearchFor("search-supervisor");
			} else if (event.target.classList.contains("search-examiner-head")) {
				setSearchFor("search-examiner-head");
			} else if (event.target.classList.contains("search-examiner-team")) {
				setSearchFor("search-examiner-team");
			} else {
				setSearchFor("search-student");
			}
		});
	});
}

export function closeModal() {
	const modal = document.getElementById("modal");
	modal.style.display = "none";
	document.body.classList.remove("modal-open");
}

export function setInputParticipants(clickedId) {
	const inputStudent = document.getElementById("npm-student");
	const inputCoordinator = document.getElementById("id-coordinator");
	const inputSupervisor = document.getElementById("id-supervisor");
	const inputExaminerHead = document.getElementById("id-examiner-head");
	const inputExaminerTeam = document.getElementById("id-examiner-team");

	let { searchFor } = getSearchFor();

	if (searchFor == "search-student") {
		inputStudent.value = clickedId;
	} else if (searchFor == "search-coordinator") {
		inputCoordinator.value = clickedId;
	} else if (searchFor == "search-supervisor") {
		inputSupervisor.value = clickedId;
	} else if (searchFor == "search-examiner-head") {
		inputExaminerHead.value = clickedId;
	} else if (searchFor == "search-examiner-team") {
		inputExaminerTeam.value = clickedId;
	}

	setParticipantsData();
	closeModal();
}

export function displayResults(results) {
	let resultList = document.querySelector(".list-result");
	// Tampilkan hasil pencarian dalam elemen list
	results.forEach(function (result) {
		let listItem = document.createElement("li");
		listItem.textContent = result.name;

		let { searchFor } = getSearchFor();

		// Set attributes based on conditions
		if (searchFor == "search-student") {
			listItem.setAttribute("data-id", result.npm);
		} else if (searchFor == "search-coordinator") {
			listItem.setAttribute("data-id", result.id_coordinator);
		} else if (searchFor == "search-supervisor") {
			listItem.setAttribute("data-id", result.id_supervisor);
		} else {
			listItem.setAttribute("data-id", result.id_examiner);
		}

		listItem.addEventListener("click", function () {
			const clickedId = this.getAttribute("data-id");
			setInputParticipants(clickedId);
		});

		resultList.appendChild(listItem);
	});
}

document.addEventListener("DOMContentLoaded", function () {
	let searchInput = document.getElementById("searchInput");
	let resultList = document.querySelector(".list-result");

	openModal();

	const { supervisors } = getParticipantsData();

	searchInput.addEventListener("keyup", function () {
		let searchValue = this.value.trim().toLowerCase(); // Mendapatkan nilai dari input pencarian

		// Kosongkan hasil pencarian sebelum menampilkan hasil baru
		resultList.innerHTML = "";

		let matchedUsers = [];

		let { searchFor } = getSearchFor();

		if (searchValue !== "") {
			if (searchFor == "search-student") {
				// Lakukan pencarian pada data mahasiswa
				matchedUsers = students.filter(function (student) {
					return student.name.toLowerCase().includes(searchValue);
				});
			} else if (searchFor == "search-coordinator") {
				// Lakukan pencarian pada data dosen coordinator
				matchedUsers = coordinators.filter(function (coordinator) {
					return coordinator.name.toLowerCase().includes(searchValue);
				});
			} else if (searchFor == "search-supervisor") {
				// Lakukan pencarian pada data dosen pembimbing
				matchedUsers = supervisors.filter(function (supervisor) {
					return supervisor.name.toLowerCase().includes(searchValue);
				});
			} else {
				// Lakukan pencarian pada data dosen penguji
				matchedUsers = examiners.filter(function (examiner) {
					return examiner.name.toLowerCase().includes(searchValue);
				});
			}
			displayResults(matchedUsers);
		}
	});

	window.addEventListener("click", function (event) {
		if (event.target === modal) {
			modal.style.display = "none";
			document.body.classList.remove("modal-open");
		}
	});
});
