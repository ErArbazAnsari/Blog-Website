// Fetch users data from users.json
const getUsersData = async () => {
    try {
        const response = await fetch("../data/users.json");
        if (!response.ok) throw new Error("Failed to fetch users data");
        const users = await response.json();
        return users;
    } catch (error) {
        console.error("Error fetching users data:", error);
        return [];
    }
};

// Save users data to users.json
// const saveUsersData = async (users) => {
//     try {
//         await fetch("../server.js", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(users),
//         });
//     } catch (error) {
//         console.error("Error saving users data:", error);
//     }
// };

// Fetch posts data from posts.json
const getPostsData = async () => {
    try {
        const response = await fetch("../data/posts.json");
        if (!response.ok) throw new Error("Failed to fetch posts data");
        const posts = await response.json();
        return posts;
    } catch (error) {
        console.error("Error fetching posts data:", error);
        return [];
    }
};

// Save posts data to posts.json
// const savePostsData = async (posts) => {
//     try {
//         await fetch("../data/posts.json", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(posts),
//         });
//     } catch (error) {
//         console.error("Error saving posts data:", error);
//     }
// };

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
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const users = await getUsersData();
        const user = users.find(
            (u) => u.email === email && u.password === password
        );

        if (user) {
            localStorage.setItem(
                "user",
                JSON.stringify({
                    id: user.id,
                    name: user.fullName,
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
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        let users = await getUsersData();

        const userExists = users.some((u) => u.email === email);
        if (userExists) {
            alert("User with this email already exists");
            return;
        }

        const user = {
            id: Date.now(),
            fullName: name,
            email,
            password,
        };

        users.push(user);
        // await saveUsersData(users);

        localStorage.setItem(
            "user",
            JSON.stringify({
                id: user.id,
                name: user.fullName,
                email: user.email,
            })
        );
        alert("Registration successful :)");
        window.location.href = "/";
    });
}

// Handle post submission form
const postForm = document.getElementById("post-form");
if (postForm) {
    postForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const title = document.getElementById("title").value;
        const content = document.getElementById("content").value;
        const user = getCurrentUser();

        if (!user) {
            alert("You must be logged in to submit a post");
            return;
        }

        let posts = await getPostsData();

        const post = {
            id: Date.now(),
            title,
            content,
            author: user.name,
            userId: user.id,
        };

        posts.push(post);
        await savePostsData(posts);

        alert("Post submitted successfully");
        window.location.href = "/";
    });
}

// View posts
const viewPosts = async () => {
    const posts = await getPostsData();
    localStorage.setItem("posts", JSON.stringify(posts));
    // Render posts (example rendering logic)
    const postsContainer = document.getElementById("posts-container");
    if (postsContainer) {
        postsContainer.innerHTML = posts
            .map(
                (post) =>
                    `<div class="post">
                        <h2>${post.title}</h2>
                        <p>${post.content}</p>
                        <small>By ${post.author}</small>
                    </div>`
            )
            .join("");
    }
};

// Update navigation
const updateNavigation = () => {
    console.log("updateNavigation");
    const navLinks = document.getElementsByClassName("nav-link");
    const user = getCurrentUser();
    if (user) {
        const logoutElement = document.createElement("a");
        logoutElement.href = "#";
        logoutElement.innerText = "Logout";
        // append logoutElement to navLinks
        navLinks[0].parentNode.appendChild(logoutElement);
    }
};

// Initialize auth state
document.addEventListener("DOMContentLoaded", () => {
    updateNavigation();
    if (document.getElementById("posts-container")) {
        viewPosts();
    }
});
