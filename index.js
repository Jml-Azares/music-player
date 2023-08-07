document.addEventListener("DOMContentLoaded", function () {
  const seekBar = document.getElementById("seek-bar");
  const startTimeDisplay = document.getElementById("start-time");
  const endTimeDisplay = document.getElementById("end-time");
  const playButton = document.getElementById("play-button");
  let animationInterval;
  let currentTime = 0;
  const duration = 242;
  let isPlaying = false;

  function updateTimeDisplay() {
    const currentTimeFormatted = formatTime(currentTime);
    startTimeDisplay.textContent = currentTimeFormatted;
    const remainingTimeFormatted = formatTime(duration - currentTime);
    endTimeDisplay.textContent = remainingTimeFormatted;
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${minutes
      .toString()
      .padStart(2, "0")}:${secondsLeft.toString().padStart(2, "0")}`;
  }

  function togglePlayButton() {
    if (isPlaying) {
      playButton.classList.remove("fa-circle-play");
      playButton.classList.add("fa-circle-pause");
    } else {
      playButton.classList.remove("fa-circle-pause");
      playButton.classList.add("fa-circle-play");
    }
  }

  playButton.addEventListener("click", function () {
    if (isPlaying) {
      clearInterval(animationInterval);
      animationInterval = null;
      isPlaying = false;
      togglePlayButton();
    } else {
      let width = (currentTime / duration) * 100;
      animationInterval = setInterval(() => {
        width += 0.1;
        currentTime = Math.floor((width / 100) * duration);
        if (width <= 100) {
          seekBar.style.width = width + "%";
          updateTimeDisplay();
        } else {
          clearInterval(animationInterval);
          animationInterval = null;
          currentTime = 0;
          seekBar.style.width = "0%";
          updateTimeDisplay();
          isPlaying = false;
          togglePlayButton();
        }
      }, (duration * 10) / 100);
      isPlaying = true;
      togglePlayButton();
    }
  });
});
