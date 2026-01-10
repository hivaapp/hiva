document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Navigation Logic ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('open');
            const icon = mobileMenuBtn.querySelector('i');
            if (mobileNav.classList.contains('open')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when a link is clicked
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('open');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // --- FAQ Accordion Logic ---
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('i');

            // Toggle current answer
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
                icon.style.transform = 'rotate(0deg)';
            } else {
                answer.style.display = 'block';
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });

    // --- Scroll Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once active if you only want it to trigger once
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);


    const scrollElements = document.querySelectorAll('.scroll-reveal');
    scrollElements.forEach(el => observer.observe(el));

    // --- Support Form Logic ---
    const supportForm = document.getElementById('support-form');
    if (supportForm) {
        supportForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const issueType = document.getElementById('issue-type').value;
            const message = document.getElementById('message').value;

            const subject = `Hiva Support Request: ${issueType}`;

            // Constructing a formatted body
            const body = `Name: ${name}\nEmail: ${email}\nIssue Type: ${issueType}\n\nMessage:\n${message}`;

            // Create mailto link
            const mailtoLink = `mailto:ican.aivisualisation@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            // Open user's email client
            window.location.href = mailtoLink;
        });
    }

});
