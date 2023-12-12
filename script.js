"use strict";

// Element/s
const inputs = document.querySelectorAll("input");

// Function/s
function addErrMsg(e) {
	const elName = e.target.getAttribute("name");

	// Check if error elements already exist
	const existingErrorElements = document.querySelectorAll(
		`[data-el-name=${elName}]`
	);

	if (existingErrorElements.length === 0) {
		// Create error icon element
		const errIcon = document.createElement("span");
		errIcon.setAttribute("data-el-name", elName);
		errIcon.classList.add("error-icon");
		errIcon.innerHTML = `<img src="./images/icon-error.svg" alt="error icon" />`;

		// Create error message
		const errMsg = document.createElement("span");
		errMsg.setAttribute("data-el-name", elName);
		errMsg.classList.add("error-message");

		// Check inputs
		if (e.target.value == "" || e.target.value == null) {
			errMsg.innerHTML = `${e.target.getAttribute(
				"placeholder"
			)} cannot be empty`;
		} else {
			errMsg.innerHTML = `It seems like this is not an ${e.target.getAttribute(
				"placeholder"
			)}`;
		}

		// Append errIcon and errMsg after input element
		e.target.after(errMsg);
		e.target.after(errIcon);

		// Add error class to change input border color
		e.target.classList.add("error");

		// Set a timeout to introduce a delay before displaying the error message
		setTimeout(() => {
			errMsg.style.opacity = "1";
			errIcon.style.opacity = "1";

			errMsg.style.transition = "opacity 0.2s";
			errIcon.style.transition = "opacity 0.2s";
		}, 100);
	}
}

function rmErrMsg(e) {
	// Get error icon and msg from target
	const elements = document.querySelectorAll(
		`[data-el-name=${e.target.getAttribute("name")}]`
	);

	// Remove error elements
	elements.forEach((element) => element.remove());

	// Remove error class from input
	e.target.classList.remove("error");
}

// Event handler/s
inputs.forEach((input) => {
	// Add event listener for invalid inputs
	input.addEventListener("invalid", addErrMsg);

	// Check validity on blur
	input.addEventListener("blur", () => input.checkValidity());

	// Remove error on focus
	input.addEventListener("focus", rmErrMsg);
});
