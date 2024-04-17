let timer;
let isPaused = false;

function startTimer(duration) {
    let timeLeft = duration;
    const countdownElement = document.getElementById('countdown');
    const timerElement = document.querySelector('.timer'); // Grab the timer element with the border
    timer = setInterval(function () {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        countdownElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (--timeLeft < 0) {
            clearInterval(timer);
            countdownElement.textContent = "Time's up!";
        }

        // Calculate progress from 1 (start, white) to 0 (end, black)
        const progressPercentage = timeLeft / duration; 
        const colorValue = Math.round(255 * (1 - progressPercentage)); // Transition from white to black
        const borderColor = `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
        timerElement.style.borderColor = borderColor; // Apply border color to the timer element
    }, 1000);
}

document.getElementById('start').addEventListener('click', function () {
    const duration = 25 * 60; // 25 minutes in seconds
    startTimer(duration);
    isPaused = false;
    document.getElementById('pause').textContent = 'Pause';
});

document.getElementById('stop').addEventListener('click', function () {
    clearInterval(timer);
    document.getElementById('countdown').textContent = '25:00';
    document.querySelector('.timer').style.borderColor = 'white'; // Reset border color to white
});

document.getElementById('pause').addEventListener('click', function () {
    if (!isPaused) {
        clearInterval(timer);
        document.getElementById('pause').textContent = 'Resume';
    } else {
        const remainingTime = document.getElementById('countdown').textContent;
        const [minutes, seconds] = remainingTime.split(':').map(Number);
        const totalSeconds = minutes * 60 + seconds;
        startTimer(totalSeconds);
        document.getElementById('pause').textContent = 'Pause';
    }
    isPaused = !isPaused;
});
