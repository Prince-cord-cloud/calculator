        const display = document.getElementById("display");
        const buttons = document.querySelectorAll(".btn");
        const equals = document.getElementById("equals");
        const clear = document.getElementById("clear");
        const historyBtn = document.getElementById("historyBtn");
        const historyContainer = document.getElementById("historyContainer");
        const historyList = document.getElementById("historyList");
        const clearHistory = document.getElementById("clearHistory");
        const installBtn = document.getElementById("installBtn");

        let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
        let deferredPrompt;

        // Calculator buttons
        buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            display.value += btn.dataset.value;
        });
        });

        equals.addEventListener("click", () => {
        try {
            const result = eval(display.value);
            if (result !== undefined) {
            history.push(`${display.value} = ${result}`);
            localStorage.setItem("calcHistory", JSON.stringify(history));
            display.value = result;
            }
        } catch {
            display.value = "Error";
        }
        });

        clear.addEventListener("click", () => (display.value = ""));

        // History functions
        historyBtn.addEventListener("click", () => {
        historyContainer.classList.toggle("hidden");
        historyList.innerHTML = history.map(item => `<p>${item}</p>`).join("");
        });

        clearHistory.addEventListener("click", () => {
        history = [];
        localStorage.removeItem("calcHistory");
        historyList.innerHTML = "";
        });

        // PWA: install button
        window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        deferredPrompt = e;
        installBtn.style.display = "block";
        });

        installBtn.addEventListener("click", async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === "accepted") {
            installBtn.style.display = "none";
            }
        }
        });

        // Register Service Worker
        if ("serviceWorker" in navigator) {
        navigator.serviceWorker.register("service-worker.js")
            .then(() => console.log("✅ Service Worker registered"))
            .catch(err => console.log("❌ SW failed:", err));
        }
