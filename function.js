let display = document.getElementById("display");

function appendValue(value) {
    display.value += value;
}
function clearDisplay() {
    display.value = "";
}
function deleteLast() {
    display.value = display.value.slice(0, -1);
} 
function appendValue(value) {
    display.value += value;
}

function calculate() {
    try{
        display.value = eval(display.value);
    } catch{
        display.value = "Error";
    }
}
const menuIcon = document.getElementById("menuIcon");
const navLinks = document.getElementById("navLinks");

menuIcon.addEventListener("click", () => {
navLinks.classList.toggle("open");
if (navLinks.style.display === "flex") {
    navLinks.style.display = "none";
} else {
    navLinks.style.display = "flex";
}
});