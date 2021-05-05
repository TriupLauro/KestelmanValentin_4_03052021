function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Validation réalisée directement dans le html
// Function valid if 2 characters or more
// function twoCharsAtLeast(value) {
//   return /\S{2,}/.test(value);
// }

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
// "X" close button (close modal)
const closeBtn = document.querySelector("span.close");
// First and last name input
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
console.log(formData[0]);
console.log(firstName);
// Submit Button(s)
const submitBtn = document.getElementsByClassName("btn-submit");

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


// // Submit modal event
// submitBtn[0].addEventListener("click", submitModal);

// // submit modal function
// function submitModal(evt) {
//   // Prevent the form from closing and sending data on submit
//   evt.preventDefault();
// }
