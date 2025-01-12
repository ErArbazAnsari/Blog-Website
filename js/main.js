// fetch post from posts.json
const getPostsData = async () => {
    if (localStorage.getItem("blog_posts")) {
        return JSON.parse(localStorage.getItem("blog_posts"));
    } else {
        try {
            const response = await fetch("../data/posts.json");
            if (!response.ok) throw new Error("Failed to fetch posts data");
            const posts = await response.json();
            // saved to posts to localStorage
            localStorage.setItem("blog_posts", JSON.stringify(posts));
            renderPosts();

            return posts;
        } catch (error) {
            console.error("Error fetching posts data:", error);
            return [];
        }
    }
};

const posts = getPostsData();

// Function to create a post card element
function createPostCard(post) {
    const article = document.createElement("article");
    article.className = "post-card";

    article.innerHTML = `
        <div class="post-card-content">
            <h2 class="post-title">
                <a href="/post.html?id=${post.id}" class="post-link">${
        post.title.length > 40
            ? post.title.substring(0, 40) + "..."
            : post.title
    }</a>
            </h2>
            <div class="post-meta">
                <time class="post-date">${new Date(
                    post.date
                ).toLocaleDateString()}</time>
                <span class="post-category">${post.category}</span>
            </div>
            <p class="post-excerpt">${
                post.excerpt.length > 95
                    ? post.excerpt.substring(0, 95) + "..."
                    : post.excerpt
            }</p>
            <div data-id="${post.id}" class="post-footer">
                <a href="/post.html?id=${
                    post.id
                }" class="btn post-btn">Read more</a>
                <i class="fa fa-trash delete-post" aria-hidden="true"></i>
            </div>
        </div>
    `;

    return article;
}

// Function to delete a post
function deletePost(id) {
    const savedPosts = JSON.parse(localStorage.getItem("blog_posts")) || [];
    const updatedPosts = savedPosts.filter((post) => post.id !== id);
    localStorage.setItem("blog_posts", JSON.stringify(updatedPosts));
    renderPosts();
}

// Event delegation for delete buttons
document.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("delete-post")) {
        const postId = e.target.parentElement.dataset.id;
        deletePost(Number(postId));
    }
});

// Function to render all posts
function renderPosts() {
    const postsGrid = document.getElementById("posts-grid");
    if (!postsGrid) return;

    // Get posts from localStorage or use sample data
    const savedPosts = JSON.parse(localStorage.getItem("blog_posts")) || posts;

    // Sort posts by date if needed
    const sortSelect = document.getElementById("sort");
    if (sortSelect) {
        savedPosts.sort((a, b) => {
            if (sortSelect.value === "newest") {
                return new Date(b.date) - new Date(a.date);
            }
            return new Date(a.date) - new Date(b.date);
        });
    }

    postsGrid.innerHTML = ""; // Clear existing posts
    savedPosts.forEach((post) => {
        postsGrid.appendChild(createPostCard(post));
    });
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById("search");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const savedPosts =
                JSON.parse(localStorage.getItem("blog_posts")) || posts;
            const filteredPosts = savedPosts.filter(
                (post) =>
                    post.title.toLowerCase().includes(searchTerm) ||
                    post.excerpt.toLowerCase().includes(searchTerm)
            );

            const postsGrid = document.getElementById("posts-grid");
            postsGrid.innerHTML = "";
            filteredPosts.forEach((post) => {
                postsGrid.appendChild(createPostCard(post));
            });
        });
    }
}

// Sort functionality
function setupSort() {
    const sortSelect = document.getElementById("sort");
    if (sortSelect) {
        sortSelect.addEventListener("change", renderPosts);
    }
}

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
    renderPosts();
    setupSearch();
    setupSort();
});
