function updateCountdown() {
    const now = new Date();
    const newYear = new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0); 
    const timeLeft = newYear - now;
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;

    const daysBar = document.getElementById('days-bar');
    const hoursBar = document.getElementById('hours-bar');
    const minutesBar = document.getElementById('minutes-bar');
    const secondsBar = document.getElementById('seconds-bar');

    const daysPercentage = (days / 365) * 100;
    const hoursPercentage = (hours / 24) * 100;
    const minutesPercentage = (minutes / 60) * 100;
    const secondsPercentage = (seconds / 60) * 100;

    daysBar.style.transform = `scaleX(${1 - daysPercentage / 100})`;
    hoursBar.style.transform = `scaleX(${1 - hoursPercentage / 100})`;
    minutesBar.style.transform = `scaleX(${1 - minutesPercentage / 100})`;
    secondsBar.style.transform = `scaleX(${1 - secondsPercentage / 100})`;

    
}

updateCountdown();
setInterval(updateCountdown, 1000);
