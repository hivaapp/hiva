// Hiva Website - Main JavaScript
// Modern interactions and animations

document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeScrollReveal();
    initializeTestimonialSlider();
    initializeFAQ();
    initializeMobileMenu();
    initializeParticleSystem();
    initializeCounters();
});

// Initialize Typed.js for hero text
function initializeAnimations() {
    // Hero text typing animation
    const typed = new Typed('#typed-text', {
        strings: [
            'Visualize Your Success',
            'Achieve Your Goals',
            'Transform Your Life',
            'Unlock Your Potential'
        ],
        typeSpeed: 80,
        backSpeed: 50,
        backDelay: 2000,
        loop: true,
        showCursor: true,
        cursorChar: '|'
    });

    // Animate elements on load
    anime({
        targets: '.reveal',
        opacity: [0, 1],
        translateY: [30, 0],
        delay: anime.stagger(200),
        duration: 800,
        easing: 'easeOutCubic'
    });
}

// Scroll reveal animations
function initializeScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Animate cards with stagger
                if (entry.target.classList.contains('stagger')) {
                    const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 100;
                    anime({
                        targets: entry.target,
                        opacity: [0, 1],
                        translateY: [30, 0],
                        delay: delay,
                        duration: 600,
                        easing: 'easeOutCubic'
                    });
                }
            }
        });
    }, observerOptions);

    // Observe all reveal elements
    document.querySelectorAll('.reveal, .stagger').forEach(el => {
        observer.observe(el);
    });
}

// Initialize testimonial slider
function initializeTestimonialSlider() {
    const splide = new Splide('#testimonial-slider', {
        type: 'loop',
        perPage: 1,
        perMove: 1,
        gap: '2rem',
        autoplay: true,
        interval: 5000,
        pauseOnHover: true,
        arrows: true,
        pagination: true,
        breakpoints: {
            768: {
                arrows: false,
            }
        }
    });
    
    splide.mount();
}

// FAQ functionality
function initializeFAQ() {
    document.querySelectorAll('.faq-item').forEach(item => {
        item.addEventListener('click', function() {
            const answer = this.querySelector('.faq-answer');
            const icon = this.querySelector('span');
            
            // Close all other FAQs
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== this) {
                    otherItem.querySelector('.faq-answer').classList.remove('active');
                    otherItem.querySelector('span').textContent = '+';
                    otherItem.querySelector('span').style.transform = 'rotate(0deg)';
                }
            });
            
            // Toggle current FAQ
            if (answer.classList.contains('active')) {
                answer.classList.remove('active');
                icon.textContent = '+';
                icon.style.transform = 'rotate(0deg)';
            } else {
                answer.classList.add('active');
                icon.textContent = '−';
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
}

// Mobile menu functionality
function initializeMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMobileMenu() {
        const isActive = mobileMenu.classList.toggle('active');
        
        // Transform hamburger to X
        const line1 = document.getElementById('menu-line-1');
        const line2 = document.getElementById('menu-line-2');
        const line3 = document.getElementById('menu-line-3');
        
        if (isActive) {
            line1.style.transform = 'rotate(45deg) translateY(8px)';
            line2.style.opacity = '0';
            line3.style.transform = 'rotate(-45deg) translateY(-8px)';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        } else {
            line1.style.transform = 'rotate(0deg) translateY(0)';
            line2.style.opacity = '1';
            line3.style.transform = 'rotate(0deg) translateY(0)';
            document.body.style.overflow = 'auto';
        }
    }

    // Event listeners
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    mobileMenuClose.addEventListener('click', toggleMobileMenu);
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            // Reset hamburger icon
            const line1 = document.getElementById('menu-line-1');
            const line2 = document.getElementById('menu-line-2');
            const line3 = document.getElementById('menu-line-3');
            line1.style.transform = 'rotate(0deg) translateY(0)';
            line2.style.opacity = '1';
            line3.style.transform = 'rotate(0deg) translateY(0)';
            document.body.style.overflow = 'auto';
        });
    });

    // Close on outside click
    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
            toggleMobileMenu();
        }
    });
}

// Particle system for hero background
function initializeParticleSystem() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    
    let particles = [];
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function createParticles() {
        particles = [];
        const particleCount = Math.min(50, Math.floor(canvas.width / 30));
        
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    function updateParticles() {
        particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;
        });
    }
    
    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
            ctx.fill();
        });
        
        // Draw connections
        particles.forEach((particle, i) => {
            particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.moveTo(particle.x, particle.y);
                    ctx.lineTo(otherParticle.x, otherParticle.y);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`;
                    ctx.stroke();
                }
            });
        });
    }
    
    function animate() {
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }
    
    resizeCanvas();
    createParticles();
    animate();
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        createParticles();
    });
}

// Animated counters
function initializeCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                
                anime({
                    targets: counter,
                    innerHTML: [0, target],
                    duration: 2000,
                    easing: 'easeOutCubic',
                    round: 1,
                    update: function(anim) {
                        counter.innerHTML = Math.round(anim.animatables[0].target.innerHTML);
                    }
                });
                
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

// Visualization modal functions
function openVisualizationModal() {
    const modal = document.getElementById('visualization-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    // Animate modal appearance
    anime({
        targets: modal.querySelector('.bg-white'),
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 300,
        easing: 'easeOutCubic'
    });
}

function closeVisualizationModal() {
    const modal = document.getElementById('visualization-modal');
    
    anime({
        targets: modal.querySelector('.bg-white'),
        scale: [1, 0.8],
        opacity: [1, 0],
        duration: 200,
        easing: 'easeInCubic',
        complete: () => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            document.getElementById('visualization-preview').classList.add('hidden');
        }
    });
}

function selectGoal(goalType) {
    const preview = document.getElementById('visualization-preview');
    const title = document.getElementById('preview-title');
    const text = document.getElementById('preview-text');
    
    const goals = {
        career: {
            title: 'Career Success Visualization',
            text: '"Imagine yourself walking into your ideal workplace, confident and prepared for an important presentation. Feel the excitement as your ideas are received with enthusiasm..."'
        },
        health: {
            title: 'Health & Fitness Visualization',
            text: '"Picture yourself completing that morning run with energy to spare. See your healthy, strong body reflecting your commitment to wellness..."'
        },
        finance: {
            title: 'Financial Goals Visualization',
            text: '"Visualize checking your bank account and seeing your savings goal achieved. Feel the security and freedom that financial stability brings..."'
        },
        relationships: {
            title: 'Relationships Visualization',
            text: '"Imagine having meaningful conversations with loved ones, feeling connected and understood. See yourself building stronger bonds..."'
        }
    };
    
    title.textContent = goals[goalType].title;
    text.textContent = goals[goalType].text;
    
    preview.classList.remove('hidden');
    
    // Animate preview appearance
    anime({
        targets: preview,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 400,
        easing: 'easeOutCubic'
    });
}

function startJourney() {
    // Close modal and scroll to download section
    closeVisualizationModal();
    
    setTimeout(() => {
        document.getElementById('download').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }, 300);
}

// Download app functions
function downloadApp(platform) {
    // Simulate download action
    const button = event.target;
    const originalText = button.textContent;
    
    button.textContent = 'Opening App Store...';
    button.disabled = true;
    
    setTimeout(() => {
        alert(`Opening ${platform === 'android' ? 'Google Play Store' : 'Apple App Store'}...\n\nThank you for your interest in Hiva! In a real implementation, this would redirect to the respective app store.`);
        button.textContent = originalText;
        button.disabled = false;
    }, 1500);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll-based navbar background
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.1)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Dark mode toggle (if needed)
function toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'));
}

// Load dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.documentElement.classList.add('dark');
}

// Add loading animation
window.addEventListener('load', function() {
    anime({
        targets: 'body',
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutCubic'
    });
});

// Performance optimization: Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();
