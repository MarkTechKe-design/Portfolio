/* =========================================
   1. NETWORK PARTICLE BACKGROUND
========================================= */
const canvas = document.getElementById('network-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
}

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5; // Slow movement
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(148, 163, 184, 0.4)'; // Premium light grey
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    let numberOfParticles = (width * height) / 15000; // Adjust density
    for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        
        // Draw connecting lines
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(148, 163, 184, ${0.15 - distance/1000})`; // Fading lines
                ctx.lineWidth = 1;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
    resize();
    initParticles();
});

// Initialize Canvas
resize();
initParticles();
animateParticles();

/* =========================================
   2. TYPING EFFECT (Hero Section)
========================================= */
const typedTextSpan = document.querySelector(".typing-text");
const textArray = ["Software Engineering", "Digital Operations", "Web Development", "Systems Architecture"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000; 
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  if (textArray.length) setTimeout(type, newTextDelay + 250);
});

/* =========================================
   3. SCROLL REVEAL ANIMATIONS (Fixes the Invisible Content)
========================================= */
const fadeElements = document.querySelectorAll('.fade-in');

// Set initial state via JS so it degrades gracefully if JS is blocked
fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
});

const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        
        // Make visible
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
    });
}, appearOptions);

fadeElements.forEach(el => appearOnScroll.observe(el));

/* =========================================
   4. NAVIGATION HIGHLIGHT & BLUR
========================================= */
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    // Add shadow/blur to nav on scroll down
    if (window.scrollY > 50) {
        navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,0.05)";
    } else {
        navbar.style.boxShadow = "none";
    }

    // Active link highlighting
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= (sectionTop - 250)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

/* =========================================
   5. INTERACTIVE TIMELINE (Experience Section)
========================================= */
function toggleTimeline(element) {
    const isActive = element.classList.contains('active');
    
    // Close all timeline nodes first
    document.querySelectorAll('.timeline-node').forEach(node => {
        node.classList.remove('active');
    });

    // If it wasn't open, open it
    if (!isActive) {
        element.classList.add('active');
    }
}

/* =========================================
   6. CONVERSION TOAST POPUP
========================================= */
let popupTriggered = false;
const toast = document.getElementById('toast-popup');

window.addEventListener('scroll', () => {
    if (popupTriggered || !toast) return;

    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (window.scrollY / documentHeight) * 100;
    
    // Show toast when user scrolls 65% down the page
    if (scrollPercentage > 65) {
        toast.classList.add('active');
        popupTriggered = true; 
    }
});
