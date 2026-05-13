// 1. Sticky Navigation Blur Effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// 2. Interactive Experience Timeline Logic
function toggleTimeline(element) {
    // Check if the clicked node is already active
    const isActive = element.classList.contains('active');
    
    // Close all timeline nodes to keep the UI clean
    document.querySelectorAll('.timeline-node').forEach(node => {
        node.classList.remove('active');
    });

    // If it wasn't active before, open it
    if (!isActive) {
        element.classList.add('active');
    }
}

// 3. Scroll Animations (Intersection Observer for fade-in effect)
const fadeElements = document.querySelectorAll('.fade-in');
const appearOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            // Apply styles directly or toggle a CSS class. 
            // We set defaults in JS to avoid hiding content if JS fails to load.
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
        }
    });
}, appearOptions);

// Setup initial state for CSS animation elements
fadeElements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
    appearOnScroll.observe(el);
});

// 4. Scroll-Triggered Conversion Popup (Toast)
let popupTriggered = false;
const toast = document.getElementById('conversionToast');

window.addEventListener('scroll', () => {
    if (popupTriggered) return;

    // Calculate how far down the user has scrolled
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (window.scrollY / documentHeight) * 100;
    
    // Trigger popup at 60% scroll depth to capture intent
    if (scrollPercentage > 60) {
        toast.classList.add('show');
        popupTriggered = true; // Ensure it only fires once per session
    }
});

// Close functionality for the Toast
function closeToast() {
    toast.classList.remove('show');
}
