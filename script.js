document.addEventListener("DOMContentLoaded", () => {
    
    /* =========================================
       1. NETWORK PARTICLE BACKGROUND
    ========================================= */
    const canvas = document.getElementById('network-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height, particles = [];

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.radius = Math.random() * 2 + 1;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(100, 116, 139, 0.4)'; 
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            let numberOfParticles = (width * height) / 12000;
            for (let i = 0; i < numberOfParticles; i++) particles.push(new Particle());
        }

        function animateParticles() {
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 130) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(100, 116, 139, ${0.15 - distance/1000})`;
                        ctx.lineWidth = 0.8;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateParticles);
        }

        window.addEventListener('resize', () => { resize(); initParticles(); });
        resize(); initParticles(); animateParticles();
    }

    /* =========================================
       2. TYPING EFFECT
    ========================================= */
    const typedTextSpan = document.querySelector(".typing-text");
    const cursorSpan = document.querySelector(".cursor");
    
    if (typedTextSpan && cursorSpan) {
        const textArray = ["Web Development.", "Data Integrations.", "System Architecture.", "Digital Operations."];
        const typingDelay = 100, erasingDelay = 50, newTextDelay = 2000;
        let textArrayIndex = 0, charIndex = 0;

        function type() {
            if (charIndex < textArray[textArrayIndex].length) {
                if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
                typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingDelay);
            } else {
                cursorSpan.classList.remove("typing");
                setTimeout(erase, newTextDelay);
            }
        }

        function erase() {
            if (charIndex > 0) {
                if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
                typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, erasingDelay);
            } else {
                cursorSpan.classList.remove("typing");
                textArrayIndex = (textArrayIndex + 1) % textArray.length;
                setTimeout(type, typingDelay + 500);
            }
        }
        setTimeout(type, newTextDelay + 250);
    }

    /* =========================================
       3. SCROLL REVEAL ANIMATIONS 
    ========================================= */
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1), transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
    });

    const appearOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    fadeElements.forEach(el => appearOnScroll.observe(el));

    /* =========================================
       4. NAVIGATION & SCROLL SPY
    ========================================= */
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        if (navbar) {
            navbar.style.boxShadow = window.scrollY > 50 ? "0 4px 20px rgba(0,0,0,0.05)" : "none";
        }

        let current = '';
        sections.forEach(section => {
            if (window.scrollY >= (section.offsetTop - 250)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) link.classList.add('active');
        });
    });

    /* =========================================
       5. INTERACTIVE TIMELINE 
    ========================================= */
    const timelineNodes = document.querySelectorAll('.timeline-node');
    timelineNodes.forEach(node => {
        node.addEventListener('click', function() {
            const isActive = this.classList.contains('active');
            timelineNodes.forEach(n => n.classList.remove('active'));
            if (!isActive) this.classList.add('active');
        });
    });

    /* =========================================
       6. CONVERSION TOAST POPUP
    ========================================= */
    const toast = document.getElementById('toast-popup');
    const closeToastBtn = document.getElementById('close-toast-btn');
    const toastContactLink = document.getElementById('toast-contact-link');
    let toastTriggered = false;

    if (toast) {
        window.addEventListener('scroll', () => {
            if (toastTriggered) return;
            const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            if (scrollPercentage > 65) {
                toast.classList.add('active');
                toastTriggered = true; 
            }
        });

        const closeToast = () => toast.classList.remove('active');
        if(closeToastBtn) closeToastBtn.addEventListener('click', closeToast);
        if(toastContactLink) toastContactLink.addEventListener('click', closeToast);
    }

    /* =========================================
       7. DYNAMIC FOOTER YEAR
    ========================================= */
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();

    /* =========================================
       8. PORTFOLIO FILTERING (NEW!)
    ========================================= */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    if (filterBtns.length > 0 && portfolioItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                
                // 1. Remove active class from all buttons, add to clicked
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // 2. Get the filter category
                const filterValue = btn.getAttribute('data-filter');

                // 3. Loop through items and filter
                portfolioItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || filterValue === itemCategory) {
                        item.classList.remove('hide');
                        item.style.animation = 'fadeInScale 0.5s ease forwards';
                    } else {
                        item.classList.add('hide');
                        item.style.animation = 'none';
                    }
                });
            });
        });
    }
});
