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

// Regex for validating e-mail (regex from https://www.w3resource.com/javascript/form/email-validation.php) maybe wrong
// May actually reject some valid addresses
function validEmail(value) {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
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
// // E-mail input
const email = document.getElementById("email");
// // Number of past contests input
// const quantity = document.getElementById("quantity");


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

// Events triggered to set custom validity message
// When changing the curstom message, prevent the form from submitting
// So not using them
// firstName.addEventListener("input", validateName);
// lastName.addEventListener("input", validateName);
// email.addEventListener("input", validateEmail);
// quantity.addEventListener("input", validateQuantity);

// Validation, function called onsubmit in html

// About the error messages displays
// The error message itself goes into the "data-error" attribute of the corresponding form
// In order to toggle visibility of the errpr message, set the "data-error-visible" attribute to true
function validate() {
  
  // Validating the first name
  let firstNameValue = firstName.value;
  console.log(firstNameValue);
  if (twoCharsAtLeast(firstNameValue)) {
    console.log("prénom valide");
    formData[0].removeAttribute("data-error");
    formData[0].setAttribute("data-error-visible", "false");
  } else {
    console.log("prénom invalide");
    formData[0].setAttribute("data-error", "Veuillez entrer au moins deux caractères");
    formData[0].setAttribute("data-error-visible", "true");
    return false;
  }

  // Validating the last name (same rules, so same validation function)
  let lastNameValue = lastName.value;
  if (twoCharsAtLeast(lastNameValue)) {
    console.log("nom valide");
    formData[1].removeAttribute("data-error");
    formData[1].setAttribute("data-error-visible", "false");
  } else {
    console.log("nom invalide");
    formData[1].setAttribute("data-error", "Veuillez entrer au moins deux caractères");
    formData[1].setAttribute("data-error-visible", "true");
    return false;
  }

  // Validating email
  if (email.value == "") {
    console.log("email non renseigné");
    formData[2].setAttribute("data-error", "Veuillez renseigner votre adresse e-mail");
    formData[2].setAttribute("data-error-visible", "true");
    return false;
  }
  if (validEmail(email.value)) {
    console.log("email valide");
    formData[1].removeAttribute("data-error");
    formData[1].setAttribute("data-error-visible", "false");
  } else {
    console.log("email non valide");
    formData[2].setAttribute("data-error", "Adresse e-mail invalide");
    formData[2].setAttribute("data-error-visible", "true");
    return false;
  }
}

// const firstErrorElt = document.createElement("p");
// formData[0].appendChild(firstErrorElt);
// firstErrorElt.innerText = twoCharsErrorMsg;
// firstErrorElt.classList.add("text-control");
// formData[0].setAttribute("data-error-visible","true");

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


// Function called when validating first and last name
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

// // Function called for e-mail validation
// // Uses the constraint validation api
// function validateEmail(evt) {
//   if (evt.target.validity.typeMismatch || evt.target.value == "") {
//     evt.target.setCustomValidity("Veuillez entrer une adresse e-mail correcte");
//     console.log("email invalide");
//   } else {
//     evt.target.setCustomValidity("");
//     console.log("email valide");
//   }
// }

// // Function called for number of past contests validation
// function validateQuantity(evt) {
//   if(oneDigitAtLeast(evt.target.value)) {
//     evt.target.setCustomValidity("");
//   } else {
//     evt.target.setCustomValidity("Veuillez entrer un nombre");
//   }
// }