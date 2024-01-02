export function getUserData() {
	// Get userData that send from server
	const userDataAttr = document
		.querySelector(".user-data")
		.getAttribute("get-user-data");
	const userData = JSON.parse(userDataAttr);

	return { userData };
}

export function getParticipantsData() {
	// Retrieving data from attributes
	let studentDataAttr = document
		.querySelector(".dt-students")
		.getAttribute("get-data-student");
	let students = JSON.parse(studentDataAttr);

	let supervisorDataAttr = document
		.querySelector(".dt-supervisors")
		.getAttribute("get-data-supervisor");
	let supervisors = JSON.parse(supervisorDataAttr);

	let examinerAttr = document
		.querySelector(".dt-examiners")
		.getAttribute("get-data-examiner");
	let examiners = JSON.parse(examinerAttr);

	let coordinatorDataAttr = document
		.querySelector(".dt-coordinators")
		.getAttribute("get-data-coordinator");
	let coordinators = JSON.parse(coordinatorDataAttr);

	return { students, supervisors, examiners, coordinators };
}

export function setParticipantsData() {
	const { supervisors } = getParticipantsData();
	const id_supervisor = document.getElementById("id-supervisor").value;

	let supervisorName = "";
	if (id_supervisor) {
		const supervisorData = supervisors.find(
			(supervisor) => supervisor.id_supervisor === id_supervisor
		);
		supervisorName = supervisorData ? supervisorData.name : "";
	}

	document.getElementById("supervisor-name").innerHTML = supervisorName;
}

export function setUserInput() {
	const { userData } = getUserData();

	if (userData != null) {
		if (userData.data_for === "student") {
			const { npm, name, email, password, thesis_topic, supervisor } = userData;

			document.getElementById("npm").value = npm;
			document.getElementById("name").value = name;
			document.getElementById("email").value = email;
			document.getElementById("password").value = password;
			document.getElementById("thesis-topic").value = thesis_topic;
			document.getElementById("id-supervisor").value = supervisor.id_supervisor;

			setParticipantsData();

			hideUserInput("student");
		} else if (userData.data_for === "lecturer") {
			const { nik, name, email, password, role } = userData;

			document.getElementById("nik").value = nik;
			document.getElementById("name").value = name;
			document.getElementById("email").value = email;
			document.getElementById("password").value = password;

			// Checkbox handling
			if (role.id_supervisor !== "") {
				document.getElementById("checkbox-supervisor").checked = true;
			} else {
				document.getElementById("checkbox-supervisor").checked = false;
			}
			if (role.id_examiner !== "") {
				document.getElementById("checkbox-examiner").checked = true;
			} else {
				document.getElementById("checkbox-examiner").checked = false;
			}
			if (role.id_coordinator !== "") {
				document.getElementById("checkbox-coordinator").checked = true;
			} else {
				document.getElementById("checkbox-coordinator").checked = false;
			}

			setParticipantsData();
			hideUserInput("lecturer");
		}
	}
}

export function hideUserInput(changeFor) {
	const studentInputs = document.querySelectorAll(".field.student");
	const lecturerInputs = document.querySelectorAll(".field.lecturer");

	studentInputs.forEach((input) => {
		input.style.display = "none";
	});

	lecturerInputs.forEach((input) => {
		input.style.display = "none";
	});

	if (changeFor === "student") {
		studentInputs.forEach((input) => {
			input.style.display = "flex";
		});
	} else {
		lecturerInputs.forEach((input) => {
			input.style.display = "flex";
		});
	}
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

export function toggleChangeIcon() {
	const roleName = document.querySelector(".show-supervisor");
	const actionBox = document.querySelector(".box-action-input");

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
}

export function toggleReadOnly() {
	const inputFields = document.querySelectorAll(".field input");
	const textArea = document.querySelector(".field textarea");
	const selectField = document.getElementById("program-study");

	inputFields.forEach((input) => {
		input.readOnly = !input.readOnly;
	});

	textArea.readOnly = !textArea.readOnly;

	selectField.disabled = !selectField.disabled;
}

export function resetInput() {
	document.getElementById("npm").value = "";
	document.getElementById("nik").value = "";
	document.getElementById("name").value = "";
	document.getElementById("email").value = "";
	document.getElementById("password").value = "";
	document.getElementById("program-study").value = "";
	document.getElementById("thesis-topic").value = "";
	document.getElementById("id-supervisor").value = "";
	document.getElementById("checkbox-supervisor").checked = false;
	document.getElementById("checkbox-examiner").checked = false;
	document.getElementById("checkbox-coordinator").checked = false;
}

export function changeInputRequired(changeFor) {
	if (changeFor === "student") {
		document.getElementById("npm").required = true;
		document.getElementById("nik").required = false;
		document.getElementById("name").required = true;
		document.getElementById("email").required = true;
		document.getElementById("password").required = true;
		document.getElementById("program-study").required = true;
		document.getElementById("thesis-topic").required = true;
		document.getElementById("id-supervisor").required = true;
	} else if (changeFor === "lecturer") {
		document.getElementById("npm").required = false;
		document.getElementById("nik").required = true;
		document.getElementById("name").required = true;
		document.getElementById("email").required = true;
		document.getElementById("password").required = true;
		document.getElementById("program-study").required = false;
		document.getElementById("thesis-topic").required = false;
		document.getElementById("id-supervisor").required = false;
	}
}

document.addEventListener("DOMContentLoaded", function () {
	const btnStudent = document.querySelector(".btn-choose-role-student");
	const btnLecturer = document.querySelector(".btn-choose-role-lecturer");
	const btnEdit = document.querySelector(".btn-edit");
	const btnSubmit = document.querySelector(".submit-button");

	function toggleActiveClass(event) {
		document
			.querySelectorAll(".btn-choose-role-student, .btn-choose-role-lecturer")
			.forEach((element) => {
				element.classList.remove("active");
			});

		event.target.classList.add("active");
	}

	function setupEventListeners() {
		btnStudent.addEventListener("click", function (event) {
			toggleActiveClass(event);
			hideUserInput("student");
			changeInputRequired("student");
			resetInput();
		});

		btnLecturer.addEventListener("click", function (event) {
			toggleActiveClass(event);
			hideUserInput("lecturer");
			changeInputRequired("lecturer");
			resetInput();
		});
	}

	function handleUserData() {
		const { userData } = getUserData();

		if (userData == null) {
			btnEdit.style.display = "none";
			toggleIconVisibility("block");
			toggleChangeIcon();
		} else {
			btnStudent.style.display = "none";
			btnLecturer.style.display = "none";
			btnSubmit.style.display = "none";

			toggleReadOnly();
			toggleIconVisibility("none");

			btnEdit.addEventListener("click", function () {
				// Toggle the visibility of the submit button
				if (
					btnSubmit.style.display === "none" ||
					btnSubmit.style.display === ""
				) {
					// If the btnSubmit is not visible or has no display setting, make it visible
					btnSubmit.style.display = "block";

					// Call a function named toggleIconVisibility and pass 'block' as an argument
					toggleIconVisibility("block");

					// Call a function named toggleChangeIcon
					toggleChangeIcon();

					// Call a function named toggleReadOnly
					toggleReadOnly();
				} else {
					// If the btnSubmit is visible, hide it
					btnSubmit.style.display = "none";

					// Call a function named toggleIconVisibility and pass 'none' as an argument
					toggleIconVisibility("none");
				}
				// Tambahkan atau hapus kelas 'active' pada btnEdit saat diklik
				btnEdit.classList.toggle("active");
			});
		}
	}

	function init() {
		setupEventListeners();
		handleUserData();
		btnStudent.click();
		setUserInput();
	}

	init();
});
