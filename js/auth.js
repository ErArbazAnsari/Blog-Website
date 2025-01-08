// Auth state management
function isLoggedIn() {
    return localStorage.getItem("user") !== null;
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
}

function logout() {
    localStorage.removeItem("user");
    window.location.href = "/login.html";
}

// Handle login form
const loginForm = document.getElementById("login-form");
if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(
            (u) => u.email === email && u.password === password
        );

        if (user) {
            localStorage.setItem(
                "user",
                JSON.stringify({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                })
            );
            window.location.href = "/";
        } else {
            alert("Invalid email or password");
        }
    });
}

// Handle registration form
const registerForm = document.getElementById("register-form");
if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Get existing users
        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Check if email already exists
        if (users.some((user) => user.email === email)) {
            alert("Email already registered");
            return;
        }

        // Create new user
        const user = {
            id: Date.now(),
            name,
            email,
            password,
        };

        // Save user
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));

        // Auto login
        localStorage.setItem(
            "user",
            JSON.stringify({
                id: user.id,
                name: user.name,
                email: user.email,
            })
        );

        window.location.href = "/";
    });
}

// Update navigation based on auth state
function updateNavigation() {
    const navLinks = document.querySelector(".nav-links");
    if (!navLinks) return;

    const user = getCurrentUser();

    if (user) {
        navLinks.innerHTML = `
            <a href="/">Home</a>
            <a href="/write.html">Write</a>
            <a href="/contact.html">Contact</a>
            <span class="user-name">${user.name}</span>
            <button onclick="logout()" class="logout-btn">Logout</button>
            <button id="theme-toggle" class="theme-toggle">
                <i class="fas fa-moon"></i>
            </button>
        `;
    } else {
        navLinks.innerHTML = `
            <a href="/">Home</a>
            <a href="/login.html">Login</a>
            <a href="/register.html">Register</a>
            <button id="theme-toggle" class="theme-toggle">
                <i class="fas fa-moon"></i>
            </button>
        `;
    }
}

// Initialize auth state
document.addEventListener("DOMContentLoaded", () => {
    updateNavigation();
});
