import "./style.css";
import "./pico.min.css";

document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector("button");
  const mainDiv = document.querySelector("div");
  const timerDisplay = document.createElement("div");
  const timeLeftDisplay = document.createElement("div");
  let timer;
  let seconds = 0;
  const sessionDuration = 30 * 60; // 30 minutes in seconds

  button.addEventListener("click", () => {
    if (button.textContent === "Start Session") {
      button.textContent = "Pause Session";
      timerDisplay.textContent = `Time: ${seconds} seconds.`;
      timeLeftDisplay.textContent = `Time left until next rest: ${Math.floor(
        (sessionDuration - seconds) / 60
      )} minutes`;
      mainDiv.appendChild(timerDisplay);
      mainDiv.appendChild(timeLeftDisplay);
      timer = setInterval(() => {
        seconds++;
        timerDisplay.textContent = `Time: ${seconds} seconds.`;
        timeLeftDisplay.textContent = `Time left until next rest: ${Math.floor(
          (sessionDuration - seconds) / 60
        )} minutes`;
        if (seconds >= sessionDuration) {
          clearInterval(timer);
          button.textContent = "Start Session";
          alert("Time for a rest!");
        }
      }, 1000);
    } else {
      button.textContent = "Start Session";
      clearInterval(timer);
    }
  });
});
