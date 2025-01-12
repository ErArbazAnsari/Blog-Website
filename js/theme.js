document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const htmlElement = document.documentElement;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme") || "light";
    htmlElement.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener("click", () => {
        const currentTheme = htmlElement.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";

        htmlElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        const themeToggle = document.getElementById("theme-toggle");
        if (themeToggle) {
            const icon = themeToggle.querySelector("i");
            if (icon) {
                icon.className =
                    theme === "light" ? "fas fa-moon" : "fas fa-sun";
            }
        }
    }

    // Logout function
    function logout() {
        const confirmation = confirm(
            "If you logout, all your data will be lost. Are you sure you want to logout?"
        );
        if (!confirmation) {
            return;
        }
        localStorage.removeItem("user");
        localStorage.removeItem("blog_posts");
        window.location.href = "/logout.html";
    }

    // Update navigation based on auth state
    function updateNavigation() {
        const nav = document.querySelector("nav");
        const user = JSON.parse(localStorage.getItem("user"));

        if (user) {
            nav.innerHTML = `
                <div class="nav-container">
                    <a href="/" class="logo">BlogLamp</a>
                    <div class="hamburger">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div class="nav-links">
                        <a href="/" class="home-nav-link" title="Home Page">Home</a>
                        <a href="/contact.html" class="contact-nav-link">Contact</a>
                        <a href="/write.html" class="write-btn write-nav-link">Write</a>
                        <button id="theme-toggle" class="theme-toggle" title="Change Theme">
                        <i class="fas fa-moon"></i>
                        </button>
                        <button id="logout-btn" class="logout-btn" title="Logout">
                            <p>${user.name}</p>
                            <i class="fas fa-sign-out-alt"></i>
                        </button>
                    </div>
                </div>`;
        } else {
            nav.innerHTML = `
                <div class="nav-container">
                    <a href="/" class="logo">BlogLamp</a>
                    <div class="hamburger">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div class="nav-links">
                        <a href="/" class="home-nav-link" title="Home Page">Home</a>
                        <a href="/contact.html" class="contact-nav-link">Contact</a>
                        <a href="/login.html" class="login-nav-link">Login</a>
                        <a href="/register.html" class="register-nav-link">Register</a>
                        <button id="theme-toggle" class="theme-toggle" title="Change Theme">
                            <i class="fas fa-moon"></i>
                        </button>
                    </div>
                </div>`;
        }

        // Re-attach theme toggle event listener
        const newThemeToggle = document.getElementById("theme-toggle");
        newThemeToggle.addEventListener("click", () => {
            const currentTheme = htmlElement.getAttribute("data-theme");
            const newTheme = currentTheme === "light" ? "dark" : "light";

            htmlElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);
            updateThemeIcon(newTheme);
        });

        // Re-attach hamburger menu event listener
        const hamburger = document.querySelector(".hamburger");
        const navLinks = document.querySelector(".nav-links");

        if (hamburger && navLinks) {
            hamburger.addEventListener("click", () => {
                navLinks.classList.toggle("active");
            });
        }

        // Attach logout event listener
        const logoutBtn = document.getElementById("logout-btn");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", logout);
        }
    }

    updateNavigation();
});
