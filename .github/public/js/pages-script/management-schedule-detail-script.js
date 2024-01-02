export function deleteParticipant() {
	const deleteBtn = document.querySelectorAll(".trash-icon");
	deleteBtn.forEach((btn) => {
		btn.addEventListener("click", function (event) {
			if (event.target.classList.contains("delete-student")) {
				document.getElementById("npm-student").value = "";
				document.getElementById("id-supervisor").value = "";
			} else if (event.target.classList.contains("delete-examiner-head")) {
				document.getElementById("id-examiner-head").value = "";
			} else if (event.target.classList.contains("delete-examiner-team")) {
				document.getElementById("id-examiner-team").value = "";
			}
			setParticipantsData();
			toggleChangeIcon();
		});
	});
}

export function getScheduleData() {
	// Get scheduleData that send from server
	const scheduleDataAttr = document
		.querySelector(".schedule-data")
		.getAttribute("get-schedule-data");
	const scheduleData = JSON.parse(scheduleDataAttr);

	return { scheduleData };
}

export function getParticipantsData() {
	// Ambil data mahasiswa dari atribut
	let studentDataAttr = document
		.querySelector(".dt-students")
		.getAttribute("get-data-student");
	let students = JSON.parse(studentDataAttr);

	// Ambil data dosen dari atribut
	let supervisorDataAttr = document
		.querySelector(".dt-supervisors")
		.getAttribute("get-data-supervisor");
	let supervisors = JSON.parse(supervisorDataAttr);

	// Ambil data mahasiswa dari atribut
	let examinerAttr = document
		.querySelector(".dt-examiners")
		.getAttribute("get-data-examiner");
	let examiners = JSON.parse(examinerAttr);

	// Ambil data dosen dari atribut
	let coordinatorDataAttr = document
		.querySelector(".dt-coordinators")
		.getAttribute("get-data-coordinator");
	let coordinators = JSON.parse(coordinatorDataAttr);

	return { students, supervisors, examiners, coordinators };
}

export function setParticipantsData() {
	const { students, supervisors, examiners, coordinators } =
		getParticipantsData();

	const npm = document.getElementById("npm-student").value;
	const id_supervisor = document.getElementById("id-supervisor").value;
	const id_coordinator = document.getElementById("id-coordinator").value;
	const id_examiner_head = document.getElementById("id-examiner-head").value;
	const id_examiner_team = document.getElementById("id-examiner-team").value;

	let studentName = "";
	if (npm) {
		const studentData = students.find((student) => student.npm === npm);
		studentName = studentData.name;
	}

	let supervisorName = "";
	if (id_supervisor) {
		const supervisorData = supervisors.find(
			(supervisor) => supervisor.id_supervisor === id_supervisor
		);
		supervisorName = supervisorData.name;
	}

	let coordinatorName = "";
	if (id_coordinator) {
		const coordinatorData = coordinators.find(
			(coordinator) => coordinator.id_coordinator === id_coordinator
		);
		coordinatorName = coordinatorData.name;
	}

	let examinerHeadName = "";
	if (id_examiner_head) {
		const examinerHeadData = examiners.find(
			(examinerHead) => examinerHead.id_examiner === id_examiner_head
		);
		examinerHeadName = examinerHeadData.name;
	}

	let examinerTeamName = "";
	if (id_examiner_team) {
		const examinerTeamData = examiners.find(
			(examinerTeam) => examinerTeam.id_examiner === id_examiner_team
		);
		examinerTeamName = examinerTeamData.name;
	}

	document.getElementById("role-student").innerHTML = studentName;
	document.getElementById("role-supervisor").innerHTML = supervisorName;
	document.getElementById("role-examiner-head").innerHTML = examinerHeadName;
	document.getElementById("role-examiner-team").innerHTML = examinerTeamName;
	document.getElementById("role-coordinator").innerHTML = coordinatorName;
}

export function setInputData() {
	const { scheduleData } = getScheduleData();
	// Check if scheduleData is not null or undefined
	if (scheduleData && Object.keys(scheduleData).length !== 0) {
		const { id_schedule, date, time, no_room, thesis_phase } =
			scheduleData.scheduleData;

		const { studentData, supervisorData, coordinatorData, examinerData } =
			scheduleData;

		// Set values to HTML inputs
		document.getElementById("date").value = date;
		document.getElementById("time").value = time;
		document.getElementById("room").value = no_room;
		document.getElementById("id-schedule").value = id_schedule;
		document.getElementById("npm-student").value = studentData.npm;
		document.getElementById("id-supervisor").value =
			supervisorData.id_supervisor;
		document.getElementById("id-coordinator").value =
			coordinatorData.id_coordinator;

		// Find head and team examiners from examinerData array
		const headExaminer = examinerData.find(
			(examiner) => examiner.examiner_role === "head"
		);
		const teamExaminer = examinerData.find(
			(examiner) => examiner.examiner_role === "team"
		);

		// Set values for id-examiner-head and id-examiner-team inputs if found
		if (headExaminer) {
			document.getElementById("id-examiner-head").value =
				headExaminer.id_examiner;
			// Set other related input values if needed
		}

		if (teamExaminer) {
			document.getElementById("id-examiner-team").value =
				teamExaminer.id_examiner;
			// Set other related input values if needed
		}

		// Set radio button based on thesis_phase
		const sidang1RadioButton = document.getElementById("thesis1");
		const sidang2RadioButton = document.getElementById("thesis2");

		if (thesis_phase === "thesis-1") {
			sidang1RadioButton.checked = true; // Mark sidang1 as selected
		} else {
			sidang2RadioButton.checked = true; // Mark sidang2 as selected
		}
	}
	setParticipantsData();
}

export function toggleChangeIcon() {
	// JavaScript logic to show/hide icons based on role-name presence
	const roles = document.querySelectorAll(".role-field");

	roles.forEach((role) => {
		const roleName = role.querySelector(".role-name");
		const actionBox = role.querySelector(".box-action-input");

		// Check if actionBox exists before querying its child elements
		if (actionBox) {
			const addIcon = actionBox.querySelector(".add-icon");
			const swapIcon = actionBox.querySelector(".swap-icon");
			const trashIcon = actionBox.querySelector(".trash-icon");

			if (roleName.innerHTML === "") {
				addIcon.style.display = "inline-block";
				swapIcon.style.display = "none";
				trashIcon.style.display = "none";
			} else {
				addIcon.style.display = "none";
				swapIcon.style.display = "inline-block";
				trashIcon.style.display = "inline-block";
			}
		}
	});
}

// Function to toggle readonly attribute for input fields
export function toggleReadOnly() {
	const inputFields = document.querySelectorAll(".field input");
	const radioGroup = document.getElementById("radioGroup");
	const radioButtons = radioGroup.querySelectorAll('input[type="radio"]');
	inputFields.forEach((input) => {
		input.readOnly = !input.readOnly;
	});

	radioButtons.forEach((radio) => {
		radio.disabled = !radio.disabled;
	});
}

// Function to toggle icon cell visibility
export function toggleIconVisibility(displayValue) {
	// Mengambil semua elemen dengan kelas CSS "add-icon", "swap-icon", dan "trash-icon"
	const iconList = document.querySelectorAll(
		".add-icon, .swap-icon, .trash-icon"
	);

	// Iterasi melalui setiap elemen yang ditemukan
	iconList.forEach((cell) => {
		// Mengubah properti CSS 'display' untuk setiap elemen
		cell.style.display = displayValue;
	});
}

document.addEventListener("DOMContentLoaded", function () {
	const msdHeader = document.querySelector(".msd-header");
	const editButton = document.querySelector(".btn-edit");
	const submitButton = document.querySelector(".submit-button");

	const { scheduleData } = getScheduleData();

	deleteParticipant();

	// Get the radio buttons and the Examiner Team field container
	const thesis1RadioButton = document.getElementById("thesis1");
	const thesis2RadioButton = document.getElementById("thesis2");
	const examinerTeamFieldContainer = document.getElementById(
		"role-examiner-team-container"
	);

	if (thesis1RadioButton.value === "thesis-1") {
		// Hide the Examiner Team field
		toggleExaminerTeamField(false);
	}

	// Function to toggle the visibility of the Examiner Team field
	function toggleExaminerTeamField(show) {
		examinerTeamFieldContainer.style.display = show ? "flex" : "none";
	}

	// Add event listeners to the radio buttons
	thesis1RadioButton.addEventListener("change", function () {
		// Check if "Thesis 1" is selected
		if (this.checked && this.value === "thesis-1") {
			// Hide the Examiner Team field
			toggleExaminerTeamField(false);
		}
	});

	thesis2RadioButton.addEventListener("change", function () {
		// Check if "Thesis 2" is selected
		if (this.checked && this.value === "thesis-2") {
			// Show the Examiner Team field
			toggleExaminerTeamField(true);
		}
	});

	if (scheduleData == null) {
		// Halaman Add Schedule Data
		msdHeader.style.display = "none";
		submitButton.style.display = "block";

		toggleIconVisibility("block");
		toggleChangeIcon();
		toggleReadOnly();
	} else {
		// Halaman Edit Schedule Data
		msdHeader.style.display = "flex";
		submitButton.style.display = "none";

		toggleIconVisibility("none");
		setInputData();

		// Add class 'active' to the edit button
		editButton.addEventListener("click", function () {
			// Toggle the visibility of the submit button
			if (
				submitButton.style.display === "none" ||
				submitButton.style.display === ""
			) {
				// If the submitButton is not visible or has no display setting, make it visible
				submitButton.style.display = "block";

				// Call a function named toggleIconVisibility and pass 'block' as an argument
				toggleIconVisibility("block");

				// Call a function named toggleChangeIcon
				toggleChangeIcon();

				// Call a function named toggleReadOnly
				toggleReadOnly();
			} else {
				// If the submitButton is visible, hide it
				submitButton.style.display = "none";

				// Call a function named toggleIconVisibility and pass 'none' as an argument
				toggleIconVisibility("none");
			}
			// Tambahkan atau hapus kelas 'active' pada editButton saat diklik
			editButton.classList.toggle("active");
		});
	}
});
