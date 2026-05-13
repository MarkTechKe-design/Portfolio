// Simple Counter Animation for your Revenue Stat
const revenueStat = document.getElementById('revenue-stat');
let count = 0;
const target = 1.5; // Represents 1.5M

const updateCount = () => {
    if(count < target) {
        count += 0.1;
        revenueStat.innerText = count.toFixed(1) + "M+";
        setTimeout(updateCount, 50);
    } else {
        revenueStat.innerText = "1.5M+";
    }
};

window.onload = updateCount;

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
