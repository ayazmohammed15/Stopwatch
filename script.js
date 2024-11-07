let startTime = 0;
let elapsedTime = 0;
let stopwatchInterval;
let isRunning = false;
let laps = [];
let lapCount = 0;

// Start or Stop the stopwatch
function startStop() {
    const startStopBtn = document.getElementById("startStopBtn");
    const resetBtn = document.getElementById("resetBtn");
    const lapBtn = document.getElementById("lapBtn");

    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        stopwatchInterval = setInterval(updateDisplay, 10);
        startStopBtn.innerText = "Pause";
        isRunning = true;
        resetBtn.disabled = true;
        lapBtn.disabled = false;
    } else {
        clearInterval(stopwatchInterval);
        elapsedTime = Date.now() - startTime;
        startStopBtn.innerText = "Start";
        isRunning = false;
        resetBtn.disabled = false;
        lapBtn.disabled = true;
    }
}

// Update the stopwatch display
function updateDisplay() {
    const display = document.getElementById("display");
    elapsedTime = Date.now() - startTime;
    
    const time = calculateTime(elapsedTime);
    display.innerText = `${pad(time.hours)}:${pad(time.minutes)}:${pad(time.seconds)}:${pad(time.milliseconds, 2)}`;
}

// Calculate the elapsed time (in HH:MM:SS:MS)
function calculateTime(time) {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor(time / (1000 * 60 * 60));

    return { hours, minutes, seconds, milliseconds };
}

// Pad numbers with leading zeros
function pad(number, digits = 2) {
    return String(number).padStart(digits, '0');
}

// Reset the stopwatch
function reset() {
    clearInterval(stopwatchInterval);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    document.getElementById("display").innerText = "00:00:00:00";
    document.getElementById("startStopBtn").innerText = "Start";
    document.getElementById("resetBtn").disabled = true;
    document.getElementById("lapBtn").disabled = true;
    document.getElementById("laps").innerHTML = "";
    lapCount = 0;
    laps = [];
}

// Record a lap time
function recordLap() {
    lapCount++;
    const lapTime = calculateTime(elapsedTime);
    const lapDisplay = `${pad(lapTime.hours)}:${pad(lapTime.minutes)}:${pad(lapTime.seconds)}:${pad(lapTime.milliseconds, 2)}`;
    
    const lapContainer = document.getElementById("laps");
    const lapElement = document.createElement("div");
    lapElement.innerText = `Lap ${lapCount}: ${lapDisplay}`;
    lapContainer.appendChild(lapElement);

    laps.push(lapDisplay);
}
