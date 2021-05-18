function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Validating conditions
// Takes an input element and returns true if the value has two characters or more
function twoCharsAtLeastInput(input) {
  return /\S{2,}/.test(input.value);
}

// Takes an input element as argument,  returns true if one digit or more (only digits)
function oneDigitAtLeastInput(input) {
  return /\d+/.test(input.value);
}

// Returns true, if the value in the input element is not an empty string
function isNotEmptyStringInput(input) {
  return input.value !== "";
}

// Check that input exists (useful for multiple choices input, select/radio)
function isNotNull(inputBlock) {
  return inputBlock !== null;
}

// Regex for validating e-mail (regex from https://www.w3resource.com/javascript/form/email-validation.php) maybe wrong
// Same but take the input element as argument
function validEmailRegexInput(input) {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(input.value);
}

// Returns the checked status of a checkbox
function isCheckedInput(input) {
  return input.checked;
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const closeBtn = document.querySelector("span.close");
const modalBody = document.querySelector(".modal-body");
const successMsg = document.querySelector(".modal-success");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal event
closeBtn.addEventListener("click", closeModal);

// close modal form
function closeModal() {
  modalbg.style.display = "none";
  resetModal();
}

// Reset the modal, removes the message displayed on success
function resetModal() {
  modalBody.style.display = "block";
  successMsg.style.display = "none";
}

// Validation event (submit form)
reserve.addEventListener("submit", validate);

// About the error messages displays
// The error message itself goes into the "data-error" attribute of the corresponding form
// In order to toggle visibility of the errpr message, set the "data-error-visible" attribute to true
function setErrorMsg(errorMsg = "", target) {
    target.setAttribute("data-error", errorMsg);
    target.setAttribute("data-error-visible", "true"); 
}

function removeErrorMsg(target) {
    target.removeAttribute("data-error");
    target.setAttribute("data-error-visible", "false");
}

// Validation, function called onsubmit in html
// For each validation check the first block correspond to a valid input
// The second one to an invalid input
function validate(e) {
  
  // Prevent the form from submitting : going to the page specified in the action attribute (index.html)
  e.preventDefault();

  // Gather all the input data with corresponding validation function
  const allFormData = {
    firstName : {
      input : document.querySelector('#first'),
      isValid : twoCharsAtLeastInput,
      errorMsg : "Veuillez entrer au moins deux caractères",
      parentDiv : document.querySelector('#first').parentElement
    },
    lastName : {
      input : document.querySelector('#last'),
      isValid : twoCharsAtLeastInput,
      errorMsg : "Veuillez entrer au moins deux caractères",
      parentDiv : document.querySelector('#last').parentElement
    },
    email : {
      input : document.querySelector('#email'),
      isValid : validEmailRegexInput,
      errorMsg : "Veuillez renseigner une adresse e-mail valide",
      parentDiv : document.querySelector('#email').parentElement
    },
    birthdate : {
      input : document.querySelector('#birthdate'),
      isValid : isNotEmptyStringInput,
      errorMsg : "Veuillez renseigner votre date de naissance",
      parentDiv : document.querySelector('#birthdate').parentElement
    },
    pastContestNumber : {
      input : document.querySelector('#quantity'),
      isValid : oneDigitAtLeastInput,
      errorMsg : "Veuillez entrer un nombre",
      parentDiv : document.querySelector('#quantity').parentElement
    },
    city : {
      input: document.querySelector('input[name="location"]:checked'),
      isValid : isNotNull,
      errorMsg : "Veuillez choisir une ville",
      parentDiv : document.querySelector('input[name="location"]').parentElement
    },
    TOSCheck : {
      input : document.querySelector('#checkbox1'),
      isValid : isCheckedInput,
      errorMsg : "Il faut approuver les termes et conditions d'utilisations",
      parentDiv : document.querySelector('#checkbox1').parentElement
    },
  }
  
  // Iterates through each data item and display corresponding error message if not valid
  // Toggle validation flag to false if at least one entry is invalid
  // If an input was previously invalid and has been corrected by the user, removes the error message
  // When the script is done iterating, check the state of the validation flag and stop execution if it is false
  const dataKeys = Object.keys(allFormData);
  let validationFlag = true;
  dataKeys.forEach((key) => { 
    if (!allFormData[key].isValid(allFormData[key].input)) {
      setErrorMsg(allFormData[key].errorMsg, allFormData[key].parentDiv);
      validationFlag = false;
    } else {
      removeErrorMsg(allFormData[key].parentDiv);
    }
  });
  if (!validationFlag) {
    return false;
  }

  // All checks have passed
  // Sotring all the input values in an object
  const inputDataObject = {
    firstName : allFormData.firstName.input.value,
    lastName : allFormData.lastName.input.value,
    email : allFormData.email.input.value,
    birthdate : allFormData.birthdate.input.value,
    pastContestNumber : allFormData.pastContestNumber.input.value,
    city : allFormData.city.input.value,
    newsletterSubscription : document.querySelector("#checkbox2").checked
  }

  console.log(inputDataObject);

  // Removes the form and display the message
  modalBody.style.display = "none";
  successMsg.style.display = "block";

  // Close the modal, resetting it, after 30s
  setTimeout(closeModal, 30000);
}