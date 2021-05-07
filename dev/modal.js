function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Validating conditions
// Function valid if 2 characters or more
function twoCharsAtLeast(value) {
  return /\S{2,}/.test(value);
}

// Retunr true if one digit or more (only digits)
function oneDigitAtLeast(value) {
  return /\d+/.test(value);
}

// Go trhought a least of radio inputs and returns true if one is checked
function oneRadioCheckedAtLeast(array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].checked  == true) {
      return true;
    }
  }
  return false;
}

// Regex for validating e-mail (regex from https://www.w3resource.com/javascript/form/email-validation.php) maybe wrong
// May actually reject some valid addresses
// Not actually called in the rest of the code (using validation API instead)
function validEmailRegex(value) {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
}

// Using validation API to validate e-mail
function validEmail(emailElt) {
  // Abort if empty
  if (emailElt.value == "") {
    return false;
  }
  // typeMismatch return true if there's an error, so we're returning the opposite
  return !emailElt.validity.typeMismatch;
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
// "X" close button (close modal)
const closeBtn = document.querySelector("span.close");
// First and last name input
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
// E-mail input
const email = document.getElementById("email");
// Birthday input
const birth = document.getElementById("birthdate");
// Number of past contests input
const quantity = document.getElementById("quantity");
// List of radio inputs, city
const cityRadio = reserve.location;
// The TOS checkbox
const tosCheck = document.getElementById("checkbox1");

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
}



// Validation, function called onsubmit in html
// For each validation check the first block correspond to a valid input
// The second one to an invalid input

// About the error messages displays
// The error message itself goes into the "data-error" attribute of the corresponding form
// In order to toggle visibility of the errpr message, set the "data-error-visible" attribute to true
function validate() {
  
  // Validating the first name
  let firstNameValue = firstName.value;
  if (twoCharsAtLeast(firstNameValue)) {
    // valid
    formData[0].removeAttribute("data-error");
    formData[0].setAttribute("data-error-visible", "false");
  } else {
    // invalid
    formData[0].setAttribute("data-error", "Veuillez entrer au moins deux caractères");
    formData[0].setAttribute("data-error-visible", "true");
    return false;
  }

  // Validating the last name (same rules, so same validation function)
  let lastNameValue = lastName.value;
  if (twoCharsAtLeast(lastNameValue)) {
    // valid
    formData[1].removeAttribute("data-error");
    formData[1].setAttribute("data-error-visible", "false");
  } else {
    // invalid
    formData[1].setAttribute("data-error", "Veuillez entrer au moins deux caractères");
    formData[1].setAttribute("data-error-visible", "true");
    return false;
  }

  // Validating email
  // Abort if empty
  if (validEmail(email)) {
    formData[2].removeAttribute("data-error");
    formData[2].setAttribute("data-error-visible", "false");
  } else {
    formData[2].setAttribute("data-error", "Veuillez renseigner votre adresse e-mail");
    formData[2].setAttribute("data-error-visible", "true");
    return false;
  }

  // if (email.value == "") {
  //   console.log("email non renseigné");
  //   formData[2].setAttribute("data-error", "Veuillez renseigner votre adresse e-mail");
  //   formData[2].setAttribute("data-error-visible", "true");
  //   return false;
  // }
  // // Uses the validation API for correct e-mail format
  // // elt.validity.typeMismatch is true if format is incorrect
  // if (email.validity.typeMismatch) {
  //   console.log("email non valide");
  //   formData[2].setAttribute("data-error", "Adresse e-mail invalide");
  //   formData[2].setAttribute("data-error-visible", "true");
  //   return false;
  // } else {
  //   console.log("email valide");
  //   formData[2].removeAttribute("data-error");
  //   formData[2].setAttribute("data-error-visible", "false");
  // }

  // Check if date as been entered
  if (birth.value != "") {
    formData[3].removeAttribute("data-error");
    formData[3].setAttribute("data-error-visible", "false");
  } else {
    formData[3].setAttribute("data-error", "Veuillez renseigner votre date de naissance");
    formData[3].setAttribute("data-error-visible", "true");
    return false;
  }
  // Validate past contest number
  let contestNumber = quantity.value;
  if (oneDigitAtLeast(contestNumber) && (contestNumber != "")) {
    formData[4].removeAttribute("data-error");
    formData[4].setAttribute("data-error-visible", "false");
  } else { 
    formData[4].setAttribute("data-error", "Veuillez entrer un nombre");
    formData[4].setAttribute("data-error-visible", "true");
    return false;
  }

  // Check if one location option is selected
  if (oneRadioCheckedAtLeast(cityRadio)) {
    formData[5].removeAttribute("data-error");
    formData[5].setAttribute("data-error-visible", "false");
  } else {
    formData[5].setAttribute("data-error", "Veuillez choisir une ville");
    formData[5].setAttribute("data-error-visible", "true");
    return false;
  }

  // Check if TOS have been approved
  if (tosCheck.checked == true) {
    formData[6].removeAttribute("data-error");
    formData[6].setAttribute("data-error-visible", "false");
  } else {
    formData[6].setAttribute("data-error", "Il faut approuver les termes et conditions d'utilisations");
    formData[6].setAttribute("data-error-visible", "true");
    return false;
  }

  //All checks passed !
}


// Events triggered to set error message
// firstName.addEventListener("input", validateName);
// lastName.addEventListener("input", validateName);
// email.addEventListener("input", validateEmail);
// quantity.addEventListener("input", validateQuantity);

// JavaScript validation with curstom error message
// Initialize all inputs with error message
// These messages prevent form from submitting
// So not using the setCustomValidity method
// if (firstName.value == ""){
//   firstName.setCustomValidity(twoCharsErrorMsg);
// }

// if (lastName.value == "") {
//   lastName.setCustomValidity(twoCharsErrorMsg);
// }

// function validateName(evt) {
//   console.log(evt.target);
//   // First Name Validation
//   if (twoCharsAtLeast(evt.target.value)) {
//     evt.target.setCustomValidity("");
//     console.log(evt.target.name + " valide");
//   } else {
//     evt.target.setCustomValidity("Veuillez entrer au moins deux caractères");
//     console.log(evt.target.name + " invalide");
//   }
// }

// function validateEmail(evt) {
//   if (evt.target.validity.typeMismatch || evt.target.value == "") {
//     evt.target.setCustomValidity("Veuillez entrer une adresse e-mail correcte");
//     console.log("email invalide");
//   } else {
//     evt.target.setCustomValidity("");
//     console.log("email valide");
//   }
// }

// function validateQuantity(evt) {
//   if(oneDigitAtLeast(evt.target.value)) {
//     evt.target.setCustomValidity("");
//   } else {
//     evt.target.setCustomValidity("Veuillez entrer un nombre");
//   }
// }