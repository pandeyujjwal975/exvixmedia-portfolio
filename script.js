/**
 * ==========================================================================
 * EXVIX MEDIA | PREMIUM AGENCY JAVASCRIPT ENGINE (2026 EDITION)
 * PART 1 - INITIALIZATION, THEME & MOBILE MENU
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", () => {

    // ===========================
    // CORE ELEMENTS
    // ===========================

    const menuBtn = document.querySelector(".menu-btn");
    const navbar = document.querySelector(".navbar");
    const menuIcon = menuBtn ? menuBtn.querySelector("i") : null;

    const header = document.querySelector(".header");
    const backToTop = document.getElementById("backToTop");
    const progressBar = document.getElementById("progressBar");

    const counters = document.querySelectorAll(".counter");
    const statsSection = document.querySelector(".stats");

    const heroImage = document.querySelector(".hero-image");
    const typingText = document.querySelector(".typing");

    const sectionElements = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".navbar a");

    const revealItems = document.querySelectorAll(
        ".service-card, .portfolio-card, .process-card, .testimonial-card, .stat-box"
    );

    let counterStarted = false;

    // ===========================
    // THEME CONTROLLER
    // ===========================

    const themeBtn = document.getElementById("themeToggle");

    if (themeBtn) {

        if (localStorage.getItem("theme") === "dark") {
            document.body.classList.add("dark");
        }

        themeBtn.addEventListener("click", () => {

            document.body.classList.toggle("dark");

            localStorage.setItem(
                "theme",
                document.body.classList.contains("dark")
                    ? "dark"
                    : "light"
            );

        });

    }

    // ===========================
    // MOBILE MENU
    // ===========================

    if (menuBtn && navbar && menuIcon) {

        menuBtn.addEventListener("click", () => {

            navbar.classList.toggle("active");
            menuBtn.classList.toggle("active");

            if (navbar.classList.contains("active")) {

                menuIcon.classList.remove("fa-bars");
                menuIcon.classList.add("fa-xmark");

            } else {

                menuIcon.classList.remove("fa-xmark");
                menuIcon.classList.add("fa-bars");

            }

        });

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navbar.classList.remove("active");
                menuBtn.classList.remove("active");

                menuIcon.classList.remove("fa-xmark");
                menuIcon.classList.add("fa-bars");

            });

        });

    }
    
        // =====================================================
    // PART 2 - SCROLL ENGINE, HEADER, NAVIGATION & PROGRESS
    // =====================================================

    function updateActiveSection() {

        if (!sectionElements.length) return;

        let currentSection = "";

        sectionElements.forEach(section => {

            const sectionTop = section.offsetTop - 160;

            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute("id");
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (
                href === `#${currentSection}` ||
                href === `index.html#${currentSection}`
            ) {
                link.classList.add("active");
            }

        });

    }


    function updateProgressBar() {

        if (!progressBar) return;

        const scrollTop =
            document.documentElement.scrollTop || document.body.scrollTop;

        const totalHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        if (totalHeight <= 0) return;

        progressBar.style.width =
            `${(scrollTop / totalHeight) * 100}%`;

    }


    function updateHeader() {

        if (!header) return;

        header.classList.toggle("sticky", window.scrollY > 60);
        header.classList.toggle("scrolled", window.scrollY > 50);

        if (window.scrollY > 100) {

            header.style.background =
                document.body.classList.contains("dark")
                    ? "rgba(7,4,15,.95)"
                    : "rgba(255,255,255,.95)";

        } else {

            header.style.background =
                document.body.classList.contains("dark")
                    ? "rgba(7,4,15,.4)"
                    : "rgba(249,248,252,.6)";

        }

    }


    function updateBackToTop() {

        if (!backToTop) return;

        backToTop.classList.toggle(
            "show",
            window.scrollY > 400
        );

    }


    function checkCounter() {

        if (
            statsSection &&
            !counterStarted &&
            window.scrollY >
            (statsSection.offsetTop - window.innerHeight + 100)
        ) {

            startCounter();
            counterStarted = true;

        }

    }


    function handleScroll() {

        updateProgressBar();

        updateHeader();

        updateBackToTop();

        updateActiveSection();

        checkCounter();

        revealOnScroll();

    }


    window.addEventListener("scroll", handleScroll);

    handleScroll();


    // ======================================
    // SMOOTH SCROLL
    // ======================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            e.preventDefault();

            const target =
                document.querySelector(this.getAttribute("href"));

            if (target) {

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });


    if (backToTop) {

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }
        // =====================================================
    // PART 3 - COUNTER, TYPING & SCROLL REVEAL
    // =====================================================

    // ---------- Animated Counter ----------
    function startCounter() {

        counters.forEach(counter => {

            const target = Number(counter.dataset.target) || 0;
            let current = 0;

            const updateCounter = () => {

                const increment = Math.max(1, Math.ceil(target / 140));

                current += increment;

                if (current >= target) {
                    counter.innerText = target;
                    return;
                }

                counter.innerText = current;

                requestAnimationFrame(updateCounter);

            };

            updateCounter();

        });

    }


    // ---------- Typewriter ----------
    if (typingText) {

        const words = [
            "Social Media",
            "Brand Identity",
            "Graphic Design",
            "Content Creation",
            "Video Editing",
            "AI Automation"
        ];

        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typeWriter() {

            const currentWord = words[wordIndex];

            if (!deleting) {

                typingText.textContent =
                    currentWord.substring(0, charIndex++);

                if (charIndex > currentWord.length) {

                    deleting = true;

                    setTimeout(typeWriter, 1500);

                    return;
                }

            } else {

                typingText.textContent =
                    currentWord.substring(0, charIndex--);

                if (charIndex < 0) {

                    deleting = false;

                    wordIndex =
                        (wordIndex + 1) % words.length;

                }

            }

            setTimeout(typeWriter, deleting ? 40 : 80);

        }

        typeWriter();

    }


    // ---------- Scroll Reveal ----------
    function revealOnScroll() {

        revealItems.forEach(item => {

            const trigger = window.innerHeight - 100;

            if (item.getBoundingClientRect().top < trigger) {

                item.classList.add("show");

            }

        });

    }

    revealOnScroll();


    // ---------- Random Animation Delay ----------
    document.querySelectorAll(".service-card").forEach(card => {

        card.style.animationDelay =
            `${Math.random() * 1.2}s`;

    });
    
    
        // =====================================================
    // PART 4 - LIGHTBOX, MAGNETIC BUTTONS & MOUSE EFFECTS
    // =====================================================

    // ---------- Portfolio Lightbox ----------
    document.querySelectorAll(".portfolio-card img").forEach(image => {

        image.addEventListener("click", () => {

            const overlay = document.createElement("div");
            overlay.className = "lightbox-overlay";

            Object.assign(overlay.style, {
                position: "fixed",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "rgba(7,4,15,.92)",
                backdropFilter: "blur(20px)",
                webkitBackdropFilter: "blur(20px)",
                zIndex: "99999",
                cursor: "zoom-out"
            });

            const img = document.createElement("img");

            img.src = image.src;

            Object.assign(img.style, {
                maxWidth: "85%",
                maxHeight: "85%",
                borderRadius: "20px",
                boxShadow: "0 25px 60px rgba(0,0,0,.45)"
            });

            overlay.appendChild(img);

            document.body.appendChild(overlay);

            document.body.style.overflow = "hidden";

            function closeLightbox() {

                overlay.remove();

                document.body.style.overflow = "";

                document.removeEventListener("keydown", escClose);

            }

            function escClose(e) {

                if (e.key === "Escape") {
                    closeLightbox();
                }

            }

            document.addEventListener("keydown", escClose);

            overlay.addEventListener("click", closeLightbox);

        });

    });


    // ---------- Magnetic Buttons ----------
    document.querySelectorAll(".btn").forEach(button => {

        button.addEventListener("mousemove", e => {

            const rect = button.getBoundingClientRect();

            const x =
                e.clientX - rect.left - rect.width / 2;

            const y =
                e.clientY - rect.top - rect.height / 2;

            button.style.transform =
                `translate(${x / 6}px, ${y / 6}px)`;

        });

        button.addEventListener("mouseleave", () => {

            button.style.transform = "";

        });

    });


    // ---------- Spotlight ----------
    if (window.innerWidth > 768) {

        const spotlight = document.createElement("div");

        spotlight.className = "spotlight";

        document.body.appendChild(spotlight);

        document.addEventListener("mousemove", e => {

            spotlight.style.left = e.clientX + "px";
            spotlight.style.top = e.clientY + "px";

            if (heroImage) {

                const moveX =
                    (window.innerWidth / 2 - e.pageX) / 45;

                const moveY =
                    (window.innerHeight / 2 - e.pageY) / 45;

                heroImage.style.transform =
                    `translate(${moveX}px, ${moveY}px)`;

            }

        });

    }


    // ---------- Preloader ----------
    const preloader =
        document.querySelector(".preloader");

    if (preloader) {

        window.addEventListener("load", () => {

            preloader.classList.add("hide");

            setTimeout(() => {

                preloader.remove();

            }, 700);

        });

    }
    
    
        // =====================================================
    // PART 5 - PORTFOLIO FILTER & FINAL INITIALIZATION
    // =====================================================

    const filters = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".portfolio-card");

    if (filters.length && cards.length) {

        filters.forEach(btn => {

            btn.addEventListener("click", () => {

                filters.forEach(button =>
                    button.classList.remove("active")
                );

                btn.classList.add("active");

                const filter = btn.dataset.filter;

                cards.forEach(card => {

                    if (
                        filter === "all" ||
                        card.dataset.category === filter
                    ) {

                        card.style.display = "";
                        requestAnimationFrame(() => {
                            card.classList.add("show");
                        });

                    } else {

                        card.style.display = "none";

                    }

                });

            });

        });

    }

    // ===========================
    // INITIAL LOAD
    // ===========================

    revealOnScroll();
    updateActiveSection();
    updateHeader();
    updateProgressBar();
    updateBackToTop();

}); // END OF DOMContentLoaded