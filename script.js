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