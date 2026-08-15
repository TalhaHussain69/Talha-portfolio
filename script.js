/* ==========================================================================
   MUHAMMAD TALHA HUSSAIN — PORTFOLIO JAVASCRIPT
   Vanilla JS: Localized 3D Hover Parallax, Active Nav IntersectionObserver, Themes, Timeline, Projects, Experience, Contact Form & Footer
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. DYNAMIC TYPING / DELETING ROLE ANIMATION --- */
    const roles = [
        '< Frontend Web Developer />',
        '< UI/UX Enthusiast />',
        '< Creative Developer />',
        '< JavaScript Developer />',
        '< AI Enthusiast />',
        '< Digital Experience Creator />'
    ];

    const typingText = document.getElementById('typing-text');
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    // Timing parameters according to user specifications
    const typeSpeed = 85;     // 70–100ms
    const deleteSpeed = 50;   // 40–60ms
    const pauseDelay = 1800;  // 1500–2000ms
    const nextWordDelay = 400;

    function typeEffect() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let currentSpeed = isDeleting ? deleteSpeed : typeSpeed;

        if (!isDeleting && charIndex === currentRole.length) {
            currentSpeed = pauseDelay;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            currentSpeed = nextWordDelay;
        }

        setTimeout(typeEffect, currentSpeed);
    }

    if (typingText) {
        setTimeout(typeEffect, 600);
    }


    /* --- 2. AMBIENT PARTICLES GENERATOR --- */
    const particlesContainer = document.getElementById('particles-container');
    const particleCount = 20; // 15–25 particles requirement

    if (particlesContainer) {
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('bg-particle');

            const size = Math.random() * 3 + 2;
            const left = Math.random() * 100;
            const duration = Math.random() * 12 + 14;
            const delay = Math.random() * 10;
            const opacity = Math.random() * 0.3 + 0.15;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${left}%`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.opacity = opacity;

            particlesContainer.appendChild(particle);
        }
    }


    /* --- 3. DEDICATED LOCALIZED HOVER INTERACTION (HERO MASCOT VISUAL) --- */
    const heroMascotVisual = document.getElementById('hero-mascot-visual');
    if (heroMascotVisual) {
        heroMascotVisual.addEventListener('mouseenter', () => {
            heroMascotVisual.classList.add('is-hovered');
        });
        heroMascotVisual.addEventListener('mouseleave', () => {
            heroMascotVisual.classList.remove('is-hovered');
        });
    }


    /* --- 4. DEDICATED LOCALIZED HOVER PARALLAX (ABOUT PORTRAIT VISUAL) --- */
    const aboutVisual = document.getElementById('about-portrait-visual');
    const layerPortraitImg = document.getElementById('layer-portrait-img');
    const layerPortraitHud = document.getElementById('layer-portrait-hud');
    const layerBadge1 = document.getElementById('layer-badge1');
    const layerBadge2 = document.getElementById('layer-badge2');

    let portraitTargetX = 0, portraitTargetY = 0;
    let portraitCurrentX = 0, portraitCurrentY = 0;

    if (aboutVisual && window.matchMedia('(pointer: fine)').matches) {

        aboutVisual.addEventListener('mousemove', (e) => {
            const rect = aboutVisual.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            portraitTargetX = x * 2 - 1;
            portraitTargetY = y * 2 - 1;
        });

        aboutVisual.addEventListener('mouseleave', () => {
            portraitTargetX = 0;
            portraitTargetY = 0;
        });

        function animatePortraitParallax() {
            portraitCurrentX += (portraitTargetX - portraitCurrentX) * 0.08;
            portraitCurrentY += (portraitTargetY - portraitCurrentY) * 0.08;

            if (layerPortraitImg) layerPortraitImg.style.transform = `translate3d(${portraitCurrentX * 4}px, ${portraitCurrentY * 4}px, 0)`;
            if (layerPortraitHud) layerPortraitHud.style.transform = `translate3d(${portraitCurrentX * -3}px, ${portraitCurrentY * -3}px, 0)`;
            if (layerBadge1) layerBadge1.style.transform = `translate3d(${portraitCurrentX * 5}px, ${portraitCurrentY * 5}px, 0)`;
            if (layerBadge2) layerBadge2.style.transform = `translate3d(${portraitCurrentX * -4}px, ${portraitCurrentY * -4}px, 0)`;

            requestAnimationFrame(animatePortraitParallax);
        }

        animatePortraitParallax();
    }


    /* --- 5. EDUCATION TIMELINE ANIMATION & NODES OBSERVER --- */
    const educationSection = document.getElementById('education');
    const timelineProgress = document.getElementById('timeline-progress');
    const milestoneItems = document.querySelectorAll('.milestone-item');

    if (educationSection && timelineProgress) {
        const eduObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    timelineProgress.classList.add('active');

                    milestoneItems.forEach((item, idx) => {
                        setTimeout(() => {
                            item.classList.add('active');
                        }, 100 * (idx + 1));
                    });
                }
            });
        }, { threshold: 0.25 });

        eduObserver.observe(educationSection);
    }


    /* --- 6. PROJECTS REVEAL ANIMATION OBSERVER --- */
    const projectsSection = document.getElementById('projects');
    const projectRows = document.querySelectorAll('.project-row, .github-cta-row');

    if (projectsSection && projectRows.length > 0) {
        const projectObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    projectRows.forEach((row, idx) => {
                        const delay = 80 * idx;
                        setTimeout(() => {
                            row.classList.add('active');
                        }, delay);
                    });
                }
            });
        }, { threshold: 0.15 });

        projectObserver.observe(projectsSection);
    }


    /* --- 7. EXPERIENCE TIMELINE ANIMATION & OBSERVER --- */
    const experienceSection = document.getElementById('experience');
    const expLineProgress = document.getElementById('exp-line-progress');
    const expEntryItems = document.querySelectorAll('.exp-entry-item');

    if (experienceSection && expLineProgress) {
        const expObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    expLineProgress.classList.add('active');

                    expEntryItems.forEach((item, idx) => {
                        setTimeout(() => {
                            item.classList.add('active');
                        }, 300 * (idx + 1));
                    });
                }
            });
        }, { threshold: 0.25 });

        expObserver.observe(experienceSection);
    }


    /* --- 8. CONTACT FORM VALIDATION & FUNCTIONAL WHATSAPP INTEGRATION --- */
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const subjectInput = document.getElementById('contact-subject');
    const messageInput = document.getElementById('contact-message');
    const formStatus = document.getElementById('form-status');

    const errName = document.getElementById('error-name');
    const errEmail = document.getElementById('error-email');
    const errSubject = document.getElementById('error-subject');
    const errMessage = document.getElementById('error-message');

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Clear previous errors
            errName.textContent = '';
            errEmail.textContent = '';
            errSubject.textContent = '';
            errMessage.textContent = '';
            formStatus.textContent = '';

            let isValid = true;

            const nameVal = nameInput.value.trim();
            const emailVal = emailInput.value.trim();
            const subjectVal = subjectInput.value.trim();
            const messageVal = messageInput.value.trim();

            if (!nameVal) {
                errName.textContent = 'Please enter your name.';
                isValid = false;
            }

            if (!emailVal) {
                errEmail.textContent = 'Please enter your email.';
                isValid = false;
            } else if (!validateEmail(emailVal)) {
                errEmail.textContent = 'Please enter a valid email address.';
                isValid = false;
            }

            if (!subjectVal) {
                errSubject.textContent = 'Please enter a subject.';
                isValid = false;
            }

            if (!messageVal) {
                errMessage.textContent = 'Please enter your message.';
                isValid = false;
            } else if (messageVal.length < 5) {
                errMessage.textContent = 'Message should be at least 5 characters.';
                isValid = false;
            }

            if (isValid) {
                formStatus.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> <span>Opening WhatsApp...</span>';
                
                const fullText = `Hello Muhammad Talha Hussain,\n\nName: ${nameVal}\nEmail: ${emailVal}\nSubject: ${subjectVal}\n\nMessage:\n${messageVal}\n\nI'd like to discuss this with you.`;
                const encodedText = encodeURIComponent(fullText);
                const whatsappUrl = `https://wa.me/923203232069?text=${encodedText}`;

                setTimeout(() => {
                    window.open(whatsappUrl, '_blank');
                    formStatus.innerHTML = '<i class="fas fa-check-circle" style="color: #25D366;"></i> <span>Opened in WhatsApp!</span>';
                    contactForm.reset();
                    setTimeout(() => { formStatus.textContent = ''; }, 4000);
                }, 800);
            }
        });
    }


    /* --- 9. CONTACT SECTION REVEAL OBSERVER --- */
    const contactSection = document.getElementById('contact');
    const contactLeft = document.querySelector('.contact-left');
    const contactRight = document.querySelector('.contact-right');

    if (contactSection) {
        const contactObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (contactLeft) contactLeft.classList.add('active');
                    if (contactRight) contactRight.classList.add('active');
                }
            });
        }, { threshold: 0.15 });

        contactObserver.observe(contactSection);
    }


    /* --- 10. DYNAMIC FOOTER COPYRIGHT YEAR & OBSERVER --- */
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    const footerContainer = document.querySelector('.footer-container');
    const footerSection = document.querySelector('.footer-section');

    if (footerSection && footerContainer) {
        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    footerContainer.classList.add('active');
                }
            });
        }, { threshold: 0.15 });

        footerObserver.observe(footerSection);
    }


    /* --- 11. INTERSECTION OBSERVER FOR ACTIVE NAVBAR LINKS --- */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length > 0 && navLinks.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '-80px 0px -40% 0px',
            threshold: 0.2
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const currentId = entry.target.getAttribute('id');
                    
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${currentId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }


    /* --- 12. LIGHT / DARK THEME SYSTEM & PERSISTENCE --- */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('.theme-icon') : null;

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        if (themeIcon) {
            if (theme === 'light') {
                themeIcon.className = 'fas fa-moon theme-icon';
                themeIcon.style.transform = 'rotate(-15deg)';
            } else {
                themeIcon.className = 'fas fa-sun theme-icon';
                themeIcon.style.transform = 'rotate(0deg)';
            }
        }
    }

    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        setTheme(savedTheme);
    } else if (!systemPrefersDark) {
        setTheme('light');
    } else {
        setTheme('dark');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }


    /* --- 13. NAVBAR SCROLL GLASSMOPHISM EFFECT --- */
    const navbar = document.getElementById('navbar');

    function checkScroll() {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll();


    /* --- 14. MOBILE NAVIGATION MENU TOGGLE --- */
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinksList = document.getElementById('nav-links');

    if (mobileToggle && navLinksList) {
        mobileToggle.addEventListener('click', () => {
            navLinksList.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                if (navLinksList.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        navLinksList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinksList.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

});
