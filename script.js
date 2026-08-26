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

/* ==========================
   Back To Top Button
========================== */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > window.innerHeight * 0.8) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");
    }
});

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});




/* ====================================
   TALHA AI COPILOT — SMART LOCAL AI ENGINE
   (100% Frontend-Only, Zero API Dependency)
==================================== */

const aiToggle = document.getElementById("aiToggle");
const aiChat = document.getElementById("aiChat");
const closeAi = document.getElementById("closeAi");
const prompts = document.querySelectorAll(".prompt-btn");
const messagesContainer = document.querySelector(".ai-messages");
const aiInput = document.getElementById("aiInput");
const sendBtn = document.getElementById("sendAiMessage");
const aiStatusDot = document.getElementById("aiStatusDot");
const aiStatusText = document.getElementById("aiStatusText");

/* ====================================
   TALHA KNOWLEDGE BASE (SOURCE OF TRUTH)
==================================== */

const TALHA_KNOWLEDGE = {
    identity: {
        name: "Muhammad Talha Hussain",
        role: "Frontend Web Developer & Computer Science Student",
        focus: "Frontend Web Development, Modern UI/UX, Responsive Design, Creative Web Experiences, and JavaScript applications."
    },
    skills: [
        "HTML5", "CSS3", "JavaScript (ES6+)", "React.js", "SQL", 
        "Git & GitHub", "Responsive Web Design", "UI/UX Development", "REST APIs"
    ],
    strengths: [
        "Detail-Oriented", "Fast Learner & Adaptable", "Logical Problem Solver", 
        "Clean Maintainable Code", "Creative Web Experience Designer"
    ],
    projects: [
        {
            name: "Learning Management System (LMS)",
            desc: "An educational platform for interactive course management and student learning."
        },
        {
            name: "Cloth Store",
            desc: "E-commerce platform layout for clothing, fashion, and shopping UI."
        },
        {
            name: "AI Chatbot",
            desc: "Intelligent conversational agent integrated into modern web interfaces."
        },
        {
            name: "Grocery Store Website",
            desc: "E-commerce solution for daily essentials and online shopping."
        },
        {
            name: "Trading Website",
            desc: "Modern dashboard and visual interface for market trading and analytics."
        },
        {
            name: "Clinic Appointment System",
            desc: "Healthcare management platform for scheduling patient appointments."
        }
    ],
    education: {
        degree: "Computer Science Student",
        focus: "Software Engineering, Web Development, Algorithms & Data Structures."
    },
    experience: {
        role: "Frontend Development Intern",
        details: "Hands-on experience developing modern user interfaces, responsive layouts, web components, and dynamic JavaScript applications."
    },
    resume: "https://drive.google.com/file/d/1CdOE5gJfXmZ8mxnWBzorA7QuPilnP03K/view?usp=sharing",
    contact: {
        whatsapp: "+92 320 3232069",
        form: "Use the contact section below to send a message directly via WhatsApp."
    }
};

/* ====================================
   CONVERSATION STATE & PERSISTENCE
==================================== */

let aiBusy = false;
let chatHistory = [];
let conversationContext = {
    lastIntent: null,
    lastTopic: null,
    lastLanguage: "english"
};

const LOCAL_STORAGE_KEY = "talha_ai_chat_history";

// Initialize Local AI status
if (aiStatusDot && aiStatusText) {
    aiStatusDot.className = "status-dot status-online";
    aiStatusText.textContent = "Online & Ready";
}

/* ====================================
   OPEN / CLOSE AI & RESTORE HISTORY
==================================== */

function loadSavedHistory() {
    try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) {
                chatHistory = parsed.slice(-20);
                renderHistoryBubbles();
            }
        }
    } catch (e) {
        console.warn("Failed to load saved AI chat history:", e);
    }
}

function saveHistory() {
    try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(chatHistory.slice(-20)));
    } catch (e) {
        console.warn("Failed to save AI chat history:", e);
    }
}

function renderHistoryBubbles() {
    if (!messagesContainer) return;
    // Clear dynamic messages leaving welcome message intact
    const welcomeMsg = messagesContainer.querySelector(".ai-welcome-message");
    messagesContainer.innerHTML = "";
    if (welcomeMsg) {
        messagesContainer.appendChild(welcomeMsg);
    }
    chatHistory.forEach(item => {
        if (item.role === "user") {
            addUserMessageDOM(item.content, false);
        } else if (item.role === "assistant") {
            addBotMessageDOM(item.content, false);
        }
    });
    scrollAiChat();
}

aiToggle?.addEventListener("click", () => {
    aiChat.classList.toggle("active");
    if (aiChat.classList.contains("active") && aiInput) {
        setTimeout(() => {
            aiInput.focus();
        }, 250);
    }
});

closeAi?.addEventListener("click", () => {
    aiChat.classList.remove("active");
});

/* ====================================
   LANGUAGE DETECTION ENGINE
==================================== */

function detectLanguage(text) {
    const lower = text.toLowerCase();
    
    // Roman Urdu keywords
    const urduKeywords = [
        "kon", "kya", "hai", "hain", "haye", "kaun", "kaise", "kaisy", "kahan", 
        "ny", "ne", "batao", "bataien", "bataen", "mujhe", "mjhe", "mera", "meri", 
        "chahiye", "chahye", "kyun", "kiya", "karo", "karein", "par", "pe", "mein", 
        "se", "sy", "raha", "rahi", "rahe", "hoon", "hun", "dono", "bhi", "rha", "rhi"
    ];

    // English keywords
    const englishKeywords = [
        "who", "what", "where", "which", "how", "why", "is", "are", "tell", 
        "show", "explain", "details", "his", "about", "can", "does", "built", 
        "study", "work", "projects", "skills", "experience", "resume", "hire"
    ];

    let urduScore = 0;
    let englishScore = 0;

    const words = lower.split(/\s+/);
    words.forEach(w => {
        const clean = w.replace(/[^a-z]/g, "");
        if (urduKeywords.includes(clean)) urduScore++;
        if (englishKeywords.includes(clean)) englishScore++;
    });

    if (urduScore > 0 && englishScore > 0) return "mixed";
    if (urduScore > 0) return "roman-urdu";
    return "english";
}

/* ====================================
   SMART INTENT DETECTION ENGINE
==================================== */

function detectIntents(input) {
    const clean = input.toLowerCase().replace(/[^a-z0-9\s]/g, " ");
    const intents = new Set();

    // Greeting
    if (/\b(hi|hello|hey|salam|assalam|aoa|greetings|good morning|good evening)\b/.test(clean)) {
        intents.add("greeting");
    }

    // Thanks
    if (/\b(thanks|thank you|shukriya|jazakallah|nice|awesome|great)\b/.test(clean)) {
        intents.add("thanks");
    }

    // Goodbye
    if (/\b(bye|goodbye|allah hafiz|cya|see ya)\b/.test(clean)) {
        intents.add("goodbye");
    }

    // Identity / Who is Talha
    if (/\b(who|kon|kaun|intro|introduce|identity|name)\b/.test(clean) && /\b(talha|he|him|you)\b/.test(clean)) {
        intents.add("identity");
    }

    // About
    if (/\b(about|overview|background|summary)\b/.test(clean)) {
        intents.add("about");
    }

    // Skills & Technologies
    if (/\b(skill|skills|tech|technologies|stack|tools|react|js|javascript|css|html|sql|git)\b/.test(clean)) {
        intents.add("skills");
    }

    // Projects
    if (/\b(project|projects|work|built|portfolio|websites|apps|lms|store|trading|clinic|grocery)\b/.test(clean)) {
        intents.add("projects");
    }

    // Education
    if (/\b(education|study|degree|university|college|padhai|qualification|student)\b/.test(clean)) {
        intents.add("education");
    }

    // Experience & Internship
    if (/\b(experience|internship|job|career|work experience|company)\b/.test(clean)) {
        intents.add("experience");
    }

    // Why Hire / Hiring
    if (/\b(hire|hiring|why hire|hire kyun|reason|strength|strengths|advantages|hire him)\b/.test(clean)) {
        intents.add("why_hire");
    }

    // Resume / CV
    if (/\b(resume|cv|download resume|download cv)\b/.test(clean)) {
        intents.add("resume");
    }

    // Contact / Reach / Social / Email / WhatsApp
    if (/\b(contact|reach|message|email|whatsapp|phone|call|number|get in touch)\b/.test(clean)) {
        intents.add("contact");
    }

    // Follow-up context check
    if (intents.size === 0) {
        if (/\b(favorite|best|top|one|which)\b/.test(clean) && conversationContext.lastTopic === "projects") {
            intents.add("favorite_project");
        } else if (/\b(more|detail|details|tell me more)\b/.test(clean) && conversationContext.lastIntent) {
            intents.add(conversationContext.lastIntent);
        }
    }

    // Direct exact keyword fallback checks
    if (intents.size === 0) {
        if (clean.includes("who is talha") || clean.includes("talha kon hai")) intents.add("identity");
        else if (clean.includes("skills")) intents.add("skills");
        else if (clean.includes("projects")) intents.add("projects");
        else if (clean.includes("education")) intents.add("education");
        else if (clean.includes("experience")) intents.add("experience");
        else if (clean.includes("resume")) intents.add("resume");
        else if (clean.includes("contact")) intents.add("contact");
    }

    return Array.from(intents);
}

/* ====================================
   LOCAL RESPONSE GENERATOR
==================================== */

function generateLocalResponse(intents, language, rawMessage) {
    if (intents.length === 0) {
        // Off-topic or unknown fallback
        if (language === "roman-urdu") {
            return "Main Talha ke portfolio ke baray mein information dene ke liye bana hoon. Aap uski **skills, projects, education, experience, resume** ya **contact** ke baray mein pooch sakte hain! 😊";
        }
        return "I'm designed to help you explore Talha's portfolio! You can ask me about his **skills, projects, education, experience, resume**, or **contact information**! 😊";
    }

    const lang = (language === "roman-urdu" || language === "mixed") ? "roman-urdu" : "english";
    const responses = [];

    intents.forEach(intent => {
        switch (intent) {
            case "greeting":
                if (lang === "roman-urdu") {
                    responses.push("Hey! 👋 Main Talha ka AI Copilot hoon. Aap Talha ke portfolio, skills, projects ya resume ke baray mein kya jana chahte hain?");
                } else {
                    responses.push("Hey there! 👋 I'm Talha's AI Copilot. What would you like to know about his skills, projects, experience, or resume?");
                }
                break;

            case "thanks":
                if (lang === "roman-urdu") {
                    responses.push("Bohot shukriya! Agar koi aur sawal ho to zaroor poochiyega. 😊");
                } else {
                    responses.push("You're very welcome! Let me know if you need anything else about Talha's work. 😊");
                }
                break;

            case "goodbye":
                if (lang === "roman-urdu") {
                    responses.push("Khuda Hafiz! Have a great day! 👋");
                } else {
                    responses.push("Goodbye! Have a great day exploring the portfolio! 👋");
                }
                break;

            case "identity":
            case "about":
                conversationContext.lastTopic = "about";
                if (lang === "roman-urdu") {
                    responses.push(`**${TALHA_KNOWLEDGE.identity.name}** ek **${TALHA_KNOWLEDGE.identity.role}** aur Computer Science student hain. Unka main focus modern UI/UX, responsive websites, aur clean JavaScript applications banane par hai.`);
                } else {
                    responses.push(`**${TALHA_KNOWLEDGE.identity.name}** is a **${TALHA_KNOWLEDGE.identity.role}** and Computer Science student. He specializes in building clean, modern, responsive web user interfaces and dynamic JavaScript experiences.`);
                }
                break;

            case "skills":
                conversationContext.lastTopic = "skills";
                const skillList = TALHA_KNOWLEDGE.skills.join(", ");
                if (lang === "roman-urdu") {
                    responses.push(`Talha ki core technical skills mein **${skillList}** shamil hain. Woh responsive design aur modern web application development mein strong hands-on expertise rakhta hai.`);
                } else {
                    responses.push(`Talha specializes in modern Frontend Web Development. His core technical stack includes: **${skillList}**.`);
                }
                break;

            case "projects":
                conversationContext.lastTopic = "projects";
                const pList = TALHA_KNOWLEDGE.projects.map(p => `• **${p.name}**: ${p.desc}`).join("\n");
                if (lang === "roman-urdu") {
                    responses.push(`Talha ne kaafi modern web projects banaye hain:\n\n${pList}\n\nAap niche portfolio projects section mein interactive preview bhi dekh sakte hain!`);
                } else {
                    responses.push(`Talha has built several impressive web development projects:\n\n${pList}\n\nYou can also check out interactive project cards directly in the portfolio!`);
                }
                break;

            case "favorite_project":
                if (lang === "roman-urdu") {
                    responses.push("Talha ke sare projects shandar hain, lekin **AI Chatbot** aur **Learning Management System (LMS)** unke sab se impressive projects hain kyun ke in mein UI design aur dynamic features bohot clean hain!");
                } else {
                    responses.push("While all of Talha's projects show great craftsmanship, the **AI Chatbot** and **Learning Management System (LMS)** stand out for their complex UI architecture and interactive features!");
                }
                break;

            case "education":
                conversationContext.lastTopic = "education";
                if (lang === "roman-urdu") {
                    responses.push(`Talha abhi **${TALHA_KNOWLEDGE.education.degree}** hai. Unki studies ka main focus Software Engineering, Web Technologies, aur Modern Programming Standards par hai.`);
                } else {
                    responses.push(`Talha is a **${TALHA_KNOWLEDGE.education.degree}** focusing on Software Engineering, Web Development, Data Structures, and Computer Science fundamentals.`);
                }
                break;

            case "experience":
                conversationContext.lastTopic = "experience";
                if (lang === "roman-urdu") {
                    responses.push(`Talha ke pas **${TALHA_KNOWLEDGE.experience.role}** ka experience hai jahan unhon ne modern web user interfaces, responsive layouts, aur dynamic web applications par kam kiya.`);
                } else {
                    responses.push(`Talha has hands-on experience as a **${TALHA_KNOWLEDGE.experience.role}**, focusing on building responsive web components, UI execution, and modern web application development.`);
                }
                break;

            case "why_hire":
                conversationContext.lastTopic = "why_hire";
                if (lang === "roman-urdu") {
                    responses.push(`Talha ko hire karne ki main waja unki strong frontend development skills (**HTML, CSS, JS, React**), clean coding standards, quick adaptability, aur creative UI/UX problem-solving mindset hai.`);
                } else {
                    responses.push(`You should hire Talha because he brings strong frontend technical expertise (**React.js, JavaScript, HTML/CSS**), high attention to UI/UX detail, clean code quality, and a passionate fast-learning attitude.`);
                }
                break;

            case "resume":
                conversationContext.lastTopic = "resume";
                if (lang === "roman-urdu") {
                    responses.push(`Aap Talha ka resume is link se view aur download kar sakte hain:\n\n${TALHA_KNOWLEDGE.resume}`);
                } else {
                    responses.push(`You can view and download Talha's complete resume here:\n\n${TALHA_KNOWLEDGE.resume}`);
                }
                break;

            case "contact":
                conversationContext.lastTopic = "contact";
                if (lang === "roman-urdu") {
                    responses.push(`Aap Talha se portfolio ke contact form ke zariye ya direct WhatsApp par connect ho sakte hain:\n\n📱 **WhatsApp**: ${TALHA_KNOWLEDGE.contact.whatsapp}\n\nNiche Form fill karke direct message bhi send kar sakte hain!`);
                } else {
                    responses.push(`You can get in touch with Talha directly through the portfolio contact form or via WhatsApp:\n\n📱 **WhatsApp**: ${TALHA_KNOWLEDGE.contact.whatsapp}\n\nFeel free to send a message anytime!`);
                }
                break;
        }
    });

    if (intents.length > 0) {
        conversationContext.lastIntent = intents[intents.length - 1];
    }

    return responses.join("\n\n");
}

// Expose functions globally for testing/access
if (typeof window !== "undefined") {
    window.detectLanguage = detectLanguage;
    window.detectIntents = detectIntents;
    window.generateLocalResponse = generateLocalResponse;
}

function scrollAiChat() {
    if (!messagesContainer) return;
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

function formatAiResponse(text) {
    if (!text) return "";

    let safe = escapeHtml(text);

    // Bold text **text** -> <strong>text</strong>
    safe = safe.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Bullet points (- or * at start of line)
    safe = safe.replace(/^[\*\-]\s+(.*)$/gm, "• $1");

    // Line breaks
    safe = safe.replace(/\n/g, "<br>");

    // Resume link auto-formatting
    safe = safe.replace(
        /https:\/\/drive\.google\.com\/[^\s<]+/g,
        (url) => {
            return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="resume-btn"><i class="fas fa-file-pdf"></i> View Resume</a>`;
        }
    );

    return safe;
}

function addUserMessageDOM(text, save = true) {
    if (!messagesContainer) return;
    const bubble = document.createElement("div");
    bubble.className = "ai-bubble ai-user";
    bubble.textContent = text;
    messagesContainer.appendChild(bubble);
    scrollAiChat();

    if (save) {
        chatHistory.push({ role: "user", content: text });
        saveHistory();
    }
}

function addBotMessageDOM(text, save = true) {
    if (!messagesContainer) return;
    const bubble = document.createElement("div");
    bubble.className = "ai-bubble ai-bot";
    bubble.innerHTML = formatAiResponse(text);
    messagesContainer.appendChild(bubble);
    scrollAiChat();

    if (save) {
        chatHistory.push({ role: "assistant", content: text });
        saveHistory();
    }
}

function showThinking() {
    hideThinking();
    if (!messagesContainer) return;
    const thinking = document.createElement("div");
    thinking.className = "ai-thinking";
    thinking.id = "thinkingBubble";
    thinking.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    messagesContainer.appendChild(thinking);
    scrollAiChat();
}

function hideThinking() {
    const thinking = document.getElementById("thinkingBubble");
    if (thinking) {
        thinking.remove();
    }
}

/* ====================================
   TYPING ANIMATION & LOCAL PIPELINE
==================================== */

function typeBotResponse(fullText) {
    return new Promise((resolve) => {
        if (!messagesContainer) {
            resolve();
            return;
        }

        const bubble = document.createElement("div");
        bubble.className = "ai-bubble ai-bot";
        messagesContainer.appendChild(bubble);

        const formattedHTML = formatAiResponse(fullText);
        
        // Instant render fallback for short messages, or character typing
        let charIndex = 0;
        const totalLen = fullText.length;
        
        // Typing speed: 12ms per char for smooth fast feel
        const timer = setInterval(() => {
            charIndex += 3;
            if (charIndex >= totalLen) {
                charIndex = totalLen;
                clearInterval(timer);
                bubble.innerHTML = formattedHTML;
                scrollAiChat();
                chatHistory.push({ role: "assistant", content: fullText });
                saveHistory();
                resolve();
            } else {
                const currentText = fullText.substring(0, charIndex);
                bubble.innerHTML = formatAiResponse(currentText);
                scrollAiChat();
            }
        }, 15);
    });
}

async function processAiMessage(overrideText = null) {
    if (aiBusy) return;

    const messageText = typeof overrideText === "string" 
        ? overrideText.trim() 
        : (aiInput ? aiInput.value.trim() : "");

    if (!messageText) return;

    aiBusy = true;
    if (sendBtn) sendBtn.disabled = true;
    if (aiInput) {
        aiInput.value = "";
        aiInput.disabled = true;
    }

    // 1. Add User Message
    addUserMessageDOM(messageText, true);

    // 2. Show thinking indicator
    showThinking();

    // 3. Detect language & intents
    const language = detectLanguage(messageText);
    const intents = detectIntents(messageText);

    // 4. Realistic local thinking delay (350ms)
    await new Promise(res => setTimeout(res, 350));

    // 5. Hide thinking indicator & generate response
    hideThinking();
    const botResponseText = generateLocalResponse(intents, language, messageText);

    // 6. Type response character-by-character
    await typeBotResponse(botResponseText);

    // 7. Cleanup state
    aiBusy = false;
    if (sendBtn) sendBtn.disabled = false;
    if (aiInput) {
        aiInput.disabled = false;
        aiInput.focus();
    }
}

/* ====================================
   EVENT LISTENERS (SINGLE PIPELINE)
=================================== */

// Quick Prompt Chips
prompts.forEach((button) => {
    button.addEventListener("click", (e) => {
        e.preventDefault();
        const text = button.innerText || button.textContent;
        if (text) {
            processAiMessage(text.trim());
        }
    });
});

// Send Button Click
sendBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    processAiMessage();
});

// Enter Key in Input
aiInput?.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        processAiMessage();
    }
});

// Restore previous session history on load
loadSavedHistory();

/* ====================================
   AI NOTIFICATION BADGE (ONCE)
=================================== */

setTimeout(() => {
    const assistant = document.getElementById("aiAssistant");
    if (!assistant) return;

    const note = document.createElement("div");
    note.className = "ai-notification";
    note.textContent = "🤖 Explore Talha with AI";
    assistant.appendChild(note);

    setTimeout(() => {
        if (note && typeof note.remove === "function") {
            note.remove();
        } else if (note && note.parentNode) {
            note.parentNode.removeChild(note);
        }
    }, 5000);
}, 3000);

