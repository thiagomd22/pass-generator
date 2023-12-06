const lengthSlider = document.querySelector(".pass-length input");
const options = document.querySelectorAll(".option input");
const copyIcon = document.querySelector(".input-box span");
const passwordInput = document.querySelector(".input-box input");
const passIndicator = document.querySelector(".pass-indicator");
const generateBtn = document.querySelector(".generate-btn");

const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!$%&|[](){}:;.,*+-#@<>~"
}

const generatePassword = () => {
    let staticPassword = "",
        randomPassword = "",
        excludeDuplicate = false,
        passLegth = lengthSlider.value;

    options.forEach(option => {
        if (option.checked) {
            if(option.id !== "exc-diplicate" && option.id !== "spaces") {
                staticPassword += characters[option.id];
            } else if (option.id == "spaces") {
                staticPassword += `  ${staticPassword}  `; 
            } else {
                excludeDuplicate = true;
            }
        }
    });

    for (let i = 0; i < passLegth; i++) {
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)];
        if (excludeDuplicate) {
            !randomPassword.includes(ramdomChar) || ramdomChar == " " ? randomPassword += randomChar : i--;
        } else {
            randomPassword += randomChar
        }
    }
    passwordInput.value = randomPassword;
}

const updatePassIndicator = () => {
    passIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
}

const updateSlider = () => {
    document.querySelector(".pass-length span").innerHTML = lengthSlider.value;
    generatePassword();
    updatePassIndicator();
}
updateSlider();

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.innerHTML = "check";
    copyIcon.style.color = "#4285f4";
    setTimeout(() => {
        copyIcon.innerHTML = "copy_all";
        copyIcon.style.color = "#707070";
    }, 1500);
}

copyIcon.addEventListener("click", copyPassword);
lengthSlider.addEventListener("input", updateSlider);
generateBtn.addEventListener("click", generatePassword);