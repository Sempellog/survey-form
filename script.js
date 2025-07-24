const form = document.getElementById("survey-form")
const submitButton = document.getElementById("submit");
const nameField = document.getElementById("name");
const nameError = document.getElementById("name-error");
const email = document.getElementById("email");
const emailError = document.getElementById("email-error");
const age = document.getElementById("age");
const ageError = document.getElementById("age-error");
const dropdown = document.getElementById("dropdown");
const statusError = document.getElementById("status-error");
const otherText = document.getElementById("other-text");
const improveText = document.getElementById("improve")
const charCount = document.getElementById("char-count")
const submitBtn = document.getElementById("submit");

const validateName = () => {
  const nameInput = nameField.value.trim();
  const validName = /^[A-Za-z\s]+$/.test(nameInput);

  const autoCapName = nameInput.split(" ").map(word => {
    if (word.length === 0) return "";
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
}).join(" ");

  nameField.value = autoCapName;

  if (validName){
    nameField.style.border = "1px solid green";
    nameError.textContent = ""; 
    return true;
  }else{
    nameField.style.border = "1px solid red";
    nameError.textContent = "Please enter a valid name (letters only, no special characters).";
    return false;
  };
};

nameField.addEventListener("blur", validateName);

const validateEmail = () => {
  const value = email.value.trim()
  const validEmail = /^[^ ]+@[^ ]+\.[^ ]+$/

  if (validEmail.test(value)){
    email.style.border = "1px solid green";
    emailError.textContent = "";
    return true;
  } else {
    email.style.border = "1px solid red";
    emailError.textContent = "Please enter a valid email (username@domain.com)";
    return false
  } 
};

email.addEventListener("blur", validateEmail);

const validateAge = () => {
  const value = age.value.trim();
  
  if (value === ""){
    age.style.border = "1px solid red";
    ageError.textContent = "Age is required";
    return false;
  }

  if (isNaN(value)){
    age.style.border = "1px solid red";
    ageError.textContent = "Please enter number only";
    return false;
  }

  const numeric = Number(value);

    if(numeric >= 60){
    age.style.border = "1px solid red";
    ageError.textContent = "Maximum age allowed is 59"
    return false;
    }else if(numeric >= 18) {
    age.style.border = "1px solid green";
    ageError.textContent = "";
    return true;
  } else {
    age.style.border = "1px solid red";
    ageError.textContent = "You must be 18 or older"
    return false
  };
}

age.addEventListener("blur", validateAge);

dropdown.addEventListener("change", () => {

    if (dropdown.value === "Other") {
    otherText.style.display = "flex";    
  } else {
    otherText.style.display = "none";
  }
  validateStatus()
});


const validateStatus = () => {
  
  if (dropdown.value === ""){
    dropdown.style.border = "1px solid red";
    statusError.textContent = "Please select a status";
    return false;
  }

  if (dropdown.value === "Other") {
    const text = otherText.value.trim();
    if (text === "") {
    otherText.style.border = "1px solid red";
    statusError.textContent = "Please specify other";
    return false;
    } else {
      otherText.style.border = "1px solid green";
      statusError.textContent = "";
      return true;
    }
  }

  dropdown.style.border = "1px solid green";
  otherText.style.border = "1px solid green";
  statusError.textContent = ""
  return true;
}

dropdown.addEventListener("blur", validateStatus);
otherText.addEventListener("blur", validateStatus);
otherText.addEventListener("input", validateStatus);

const countText = () => {
  let cleanedText = improveText.value;
  const maxchar = 200;

  if (cleanedText.length > maxchar) {
    cleanedText = cleanedText.slice(0, maxchar);
    improveText.value = cleanedText;
  }
  charCount.textContent = `${cleanedText.length} / ${maxchar} `
}

improveText.addEventListener("input", countText);

form.addEventListener("submit", (e) => {

  const isValidName = validateName();
  const isValidEmail = validateEmail();
  const isValidAge = validateAge();
  const isValidStatus = validateStatus();

  if (!(isValidName && isValidEmail && isValidAge && isValidStatus)) {
    e.preventDefault();
    console.log("Form submitted successfully!");
  } else {
    console.log("Fix the errors before submitting.");
  }
});