//===========================
// Calculator Logic
// =============================
const buttons = document.querySelectorAll(".btn");
const inputField = document.getElementById("input");
const resultField = document.getElementById("result");
const clear = document.getElementById("clear");
const backspace = document.getElementById("backspace");
const equal = document.getElementById("equal");

let expression = "";

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.dataset.value;
        if (value !== undefined) {
            expression += value;
            inputField.textContent = expression;
        }
    });
});

clear.addEventListener("click", () => {
    expression = "";
    inputField.textContent = "";
    resultField.textContent = "";
});

backspace.addEventListener("click", () => {
    expression = expression.slice(0, -1);
    inputField.textContent = expression;
});

equal.addEventListener("click", () => {
    try {
        let result = eval(expression);
        resultField.textContent = result;
    } catch {
        resultField.textContent = "Error";
    }
});

// =============================
// PWA Install Button Logic
// =============================
let deferredPrompt;
const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = "block"; // Show install button
});

installBtn.addEventListener("click", async () => {
    installBtn.style.display = "none";
    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === "accepted") {
            console.log("App installed successfully!");
        }
        deferredPrompt = null;
    }
});