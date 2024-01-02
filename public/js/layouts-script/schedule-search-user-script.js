import {
	getParticipantsData,
	setParticipantsData,
} from "../pages-script/management-schedule-detail-script.js";

let searchFor = "search-students";
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
			if (event.target.classList.contains("search-examiner-head")) {
				setSearchFor("search-examiner-head");
			} else if (event.target.classList.contains("search-examiner-team")) {
				setSearchFor("search-examiner-team");
			} else {
				setSearchFor("search-students");
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
	const inputSupervisor = document.getElementById("id-supervisor");
	const inputExaminerHead = document.getElementById("id-examiner-head");
	const inputExaminerTeam = document.getElementById("id-examiner-team");

	let { searchFor } = getSearchFor();
	const { students } = getParticipantsData();

	if (searchFor == "search-students") {
		const dataStudent = students.find((student) => student.npm === clickedId);
		inputStudent.value = dataStudent.npm;
		inputSupervisor.value = dataStudent.id_supervisor;
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

		// Set attributes based on conditions
		if (searchFor == "search-students") {
			listItem.setAttribute("data-id", result.npm);
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

	const { students, examiners } = getParticipantsData();

	openModal();

	searchInput.addEventListener("keyup", function () {
		let searchValue = this.value.trim().toLowerCase(); // Mendapatkan nilai dari input pencarian

		// Kosongkan hasil pencarian sebelum menampilkan hasil baru
		resultList.innerHTML = "";

		let matchedStudents = []; // Declare variables outside of if blocks
		let matchedLecturers = []; // to ensure they are accessible later

		let { searchFor } = getSearchFor();

		if (searchValue !== "") {
			if (searchFor == "search-students") {
				// Lakukan pencarian pada data mahasiswa
				matchedStudents = students.filter(function (student) {
					return student.name.toLowerCase().includes(searchValue);
				});
				displayResults(matchedStudents);
			} else {
				// Lakukan pencarian pada data dosen pembimbing
				matchedLecturers = examiners.filter(function (examiner) {
					return examiner.name.toLowerCase().includes(searchValue);
				});
				displayResults(matchedLecturers);
			}
		}
	});

	window.addEventListener("click", function (event) {
		if (event.target === modal) {
			modal.style.display = "none";
			document.body.classList.remove("modal-open");
		}
	});
});
