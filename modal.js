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

// Same but take an input element instead of a value
function twoCharsAtLeastInput(input) {
  return /\S{2,}/.test(input.value);
}

// Return true if one digit or more (only digits)
function oneDigitAtLeast(value) {
  return /\d+/.test(value);
}

// Same but take an input element as argument
function oneDigitAtLeastInput(input) {
  return /\d+/.test(input.value);
}

// Returns true, if the value in the input element is not an empty string
function isNoteEmptyStringInput(input) {
  return input.value != "";
}

// Go trhought a least of radio inputs and returns the city checked if there's one
// return false is there's none
function citySelected(array) {
  for (cityChoice of array) {
    if (cityChoice.checked  == true) {
      return cityChoice.value;
    }
  }
  return false;
}

// Check that input (useful for multiple choices input, select/radio)
function isNotNull(inputBlock) {
  return inputBlock != null;
}

// Regex for validating e-mail (regex from https://www.w3resource.com/javascript/form/email-validation.php) maybe wrong
// May actually reject some valid addresse
function validEmailRegex(value) {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
}

// Same but take the input element as argument
function validEmailRegexInput(input) {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(input.value);
}

// Using validation API to validate e-mail, in this version emailElt is actually the parent of the input tag, so emailElt.children is necessary
// Not used anymore
function validEmail(emailElt) {
  // Abort if empty
  if (emailElt.inputValue == "") {
    return false;
  }
  // typeMismatch return true if there's an error, so we're returning the opposite
  return !emailElt.inputBlock.typeMismatch; 
}

// Returns the checked status of a checkbox
function isCheckedInput(input) {
  return input.checked;
}

// Always returns true, take an input element as argument but doesn't actually use it
function isAlwaysValid(input) {
  return true;
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
// "X" close button (close modal)
const closeBtn = document.querySelector("span.close");
// Modal body
const modalBody = document.querySelector(".modal-body");
// Success message
const successMsg = document.querySelector(".modal-success");


// Not used anymore
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
// End of unused DOM objects

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

// Not used anymore
// Class containing the input
// FormBlock is the parent block
// inputList is the list of input elements contained
// 1 if text input, more if multiple choice checkbox
// If there is only one, the value of the text input is stored in inputValue
class FormDataObject {
  constructor (formBlock) {
    this.formBlock = formBlock;
    this.inputList = formBlock.getElementsByTagName("input");
    // Get the input value, excluding multiple choices input
    if (this.inputList.length == 1) {
      this.inputBlock = this.inputList[0];
      this.inputValue = this.inputBlock.value;
    }
  }

  removeError() {
    removeErrorMsg(this.formBlock);
  }

  displayError(errorMsg = "") {
    setErrorMsg(errorMsg, this.formBlock);
  }
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
      input : reserve.querySelector('#first'),
      isValid : twoCharsAtLeastInput,
      errorMsg : "Veuillez entrer au moins deux caractères",
      parentDiv : reserve.querySelector('#first').parentElement
    },
    lastName : {
      input : reserve.querySelector('#last'),
      isValid : twoCharsAtLeastInput,
      errorMsg : "Veuillez entrer au moins deux caractères",
      parentDiv : reserve.querySelector('#last').parentElement
    },
    email : {
      input : reserve.querySelector('#email'),
      isValid : validEmailRegexInput,
      errorMsg : "Veuillez renseigner une adresse e-mail valide",
      parentDiv : reserve.querySelector('#email').parentElement
    },
    birthdate : {
      input : reserve.querySelector('#birthdate'),
      isValid : isNoteEmptyStringInput,
      errorMsg : "Veuillez renseigner votre date de naissance",
      parentDiv : reserve.querySelector('#birthdate').parentElement
    },
    pastContestNumber : {
      input : reserve.querySelector('#quantity'),
      isValid : oneDigitAtLeastInput,
      errorMsg : "Veuillez entrer un nombre",
      parentDiv : reserve.querySelector('#quantity').parentElement
    },
    city : {
      input: reserve.querySelector('input[name="location"]:checked'),
      isValid : isNotNull,
      errorMsg : "Veuillez choisir une ville",
      parentDiv : reserve.querySelector('input[name="location"]').parentElement
    },
    TOSCheck : {
      input : reserve.querySelector('#checkbox1'),
      isValid : isCheckedInput,
      errorMsg : "Il faut approuver les termes et conditions d'utilisations",
      parentDiv : reserve.querySelector('#checkbox1').parentElement
    },
    // Not needed for validation
    // newsletterSubscription : {
    //   input : reserve.querySelector('#checkbox2'),
    //   isValid : isAlwaysValid,
    //   errorMsg : "",
    //   parentDiv : reserve.querySelector('#checkbox2').parentElement
    // }
  }
  
  // Store the keys of the above object in an array
  const dataKeys = Object.keys(allFormData);
  
  // Iterates through each data item and display corresponding error message if not valid
  // Returns false if at least one entry is invalid to prevent rest of code from executing
  let validationFlag = true;
  dataKeys.forEach(function(key) { 
    //console.log(`${key} : isValid : ${allFormData[key].isValid(allFormData[key].input)}`);
    if (!allFormData[key].isValid(allFormData[key].input)) {
      // Only run if validation function returns false
      setErrorMsg(allFormData[key].errorMsg, allFormData[key].parentDiv);
      validationFlag = false;
    } else {
      // Remove the error message if the input is validated
      removeErrorMsg(allFormData[key].parentDiv);
    }
  });
  if (!validationFlag) {
    // Only runs if there's at least one input invalid
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
    newsletterSubscription : reserve.querySelector("#checkbox2").checked
  }

  console.log(inputDataObject);
  
  // Method with class, not used anymore

  // Getting all the input object and value thanks to the class FormDataObject
  // The class assign to each object the parent block ()
  // let formObjectList = [];
  // for (formBlockElt of formData) {
  //   formObjectList.push(new FormDataObject(formBlockElt));
  // }
  // // Elements in order :
  // // 0 : First Name
  // // 1 : Last Name
  // // 2 : e-mail
  // // 3 : birthdate
  // // 4 : number of past contests
  // // 5 : city
  // // 6 : TOS and newsletter check
  
  // // First Name
  // if (twoCharsAtLeast(formObjectList[0].inputValue)) {
  //   // Valid
  //   formObjectList[0].removeError();
  // } else {
  //   // Invalid
  //   formObjectList[0].displayError("Veuillez entrer au moins deux caractères");
  //   return false;
  // }

  // // Without the class
  // // let firstNameValue = firstName.value;
  // // if (twoCharsAtLeast(firstNameValue)) {
  // //   // valid
  // //   removeErrorMsg(formData[0]);
  // // } else {
  // //   // invalid
  // //   setErrorMsg("Veuillez entrer au moins deux caractères", formData[0]);
  // //   return false;
  // // }

  // // Same result, explicit method
  // // Validating the last name (same rules, so same validation function)
  // // let lastNameValue = lastName.value;
  // // if (twoCharsAtLeast(lastNameValue)) {
  // //   // valid
  // //   formData[1].removeAttribute("data-error");
  // //   formData[1].setAttribute("data-error-visible", "false");
  // // } else {
  // //   // invalid
  // //   formData[1].setAttribute("data-error", "Veuillez entrer au moins deux caractères");
  // //   formData[1].setAttribute("data-error-visible", "true");
  // //   return false;
  // // }

  // // Last Name
  // if (twoCharsAtLeast(formObjectList[1].inputValue)) {
  //   // Valid
  //   formObjectList[1].removeError();
  // } else {
  //   // Invalid
  //   formObjectList[1].displayError("Veuillez entrer au moins deux caractères");
  //   return false;
  // }

  // // Validating email
  // if (validEmail(formObjectList[2])) {
  //   formObjectList[2].removeError();
  // } else {
  //   formObjectList[2].displayError("Veuillez renseigner une adresse e-mail valide");
  //   return false;
  // }
  
  // // if (validEmail(email)) {
  // //   formData[2].removeAttribute("data-error");
  // //   formData[2].setAttribute("data-error-visible", "false");
  // // } else {
  // //   formData[2].setAttribute("data-error", "Veuillez renseigner votre adresse e-mail");
  // //   formData[2].setAttribute("data-error-visible", "true");
  // //   return false;
  // // }

  // // if (email.value == "") {
  // //   console.log("email non renseigné");
  // //   formData[2].setAttribute("data-error", "Veuillez renseigner votre adresse e-mail");
  // //   formData[2].setAttribute("data-error-visible", "true");
  // //   return false;
  // // }
  // // // Uses the validation API for correct e-mail format
  // // // elt.validity.typeMismatch is true if format is incorrect
  // // if (email.validity.typeMismatch) {
  // //   console.log("email non valide");
  // //   formData[2].setAttribute("data-error", "Adresse e-mail invalide");
  // //   formData[2].setAttribute("data-error-visible", "true");
  // //   return false;
  // // } else {
  // //   console.log("email valide");
  // //   formData[2].removeAttribute("data-error");
  // //   formData[2].setAttribute("data-error-visible", "false");
  // // }

  // // Check if date as been entered
  // if (formObjectList[3].inputValue != "") {
  //   formObjectList[3].removeError();
  // } else {
  //   formObjectList[3].displayError("Veuillez renseigner votre date de naissance");
  //   return false;
  // }
    
  // // Validate past contest number
  // if (oneDigitAtLeast(formObjectList[4].inputValue) && (formObjectList[4].inputValue != "")) {
  //   formObjectList[4].removeError();
  // } else { 
  //   formObjectList[4].displayError("Veuillez entrer un nombre");
  //   return false;
  // }

  // // Check if one location option is selected
  // formObjectList[5].inputValue  = citySelected(formObjectList[5].inputList);
  // if (formObjectList[5].inputValue != false) {
  //   formObjectList[5].removeError();
  // } else {
  //   formObjectList[5].displayError("Veuillez choisir une ville");
  //   return false;
  // }

  // // Check if TOS have been approved
  // if (formObjectList[6].inputList[0].checked == true) {
  //   formObjectList[6].removeError();
  //   formObjectList[6].inputValue = formObjectList[6].inputList[1].checked;
  // } else {
  //   formObjectList[6].displayError("Il faut approuver les termes et conditions d'utilisations");
  //   return false;
  // }

  // End of old method with class

  //All checks passed !
  // Storing data in an object
  

  // let inputDataObject = {
  //   firstName : formObjectList[0].inputValue,
  //   lastName : formObjectList[1].inputValue,
  //   email : formObjectList[2].inputValue,
  //   birthday : formObjectList[3].inputValue,
  //   pastContestNumber : formObjectList[4].inputValue,
  //   city : formObjectList[5].inputValue,
  //   newsletterSubscription : formObjectList[6].inputValue
  // };

  // Removes the form and display the message
  modalBody.style.display = "none";
  successMsg.style.display = "block";

  // Close the modal, resetting it, after 30s
  setTimeout(closeModal, 30000);
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