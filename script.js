let startStopBtn = document.getElementById("startStop");
let resetBtn = document.getElementById("reset");
let lapBtn = document.getElementById("lap");
let display = document.getElementById("display");
let circle = document.getElementById("circle");
let lapsList = document.querySelector("#laps ul");

let timerInterval;
let isRunning = false;
let elapsedTime = 0;

function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    let seconds = String(totalSeconds % 60).padStart(2, "0");
    let milliseconds = String(ms % 1000).padStart(3, "0").slice(0, 2);
    return `${minutes}:${seconds}:${milliseconds}`;
}

startStopBtn.addEventListener("click", () => {
    if (isRunning) {
        clearInterval(timerInterval);
        startStopBtn.textContent = "Start";
        circle.style.animation = "none"; 
    } else {
        let startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            display.textContent = formatTime(elapsedTime);
        }, 10);
        startStopBtn.textContent = "Stop";
        circle.style.animation = "loaderanimate 3s linear infinite"; 
    }
    isRunning = !isRunning;
});

resetBtn.addEventListener("click", () => {
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = 0;
    display.textContent = "00:00:00";
    startStopBtn.textContent = "Start";
    circle.style.animation = "none"; 
    lapsList.innerHTML = ""; 
});

lapBtn.addEventListener("click", () => {
    if (isRunning) {
        let lapTime = formatTime(elapsedTime);
        let lapItem = document.createElement("li");
        lapItem.textContent = lapTime;
        lapsList.appendChild(lapItem);
    }
});
