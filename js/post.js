document.addEventListener("DOMContentLoaded", () => {
    // Get post ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("id");

    if (!postId) {
        window.location.href = "/"; // Redirect to home if no ID
        return;
    }

    // Get posts from localStorage
    const posts = JSON.parse(localStorage.getItem("blog_posts")) || [];
    const post = posts.find((p) => p.id.toString() === postId);

    if (!post) {
        window.location.href = "/"; // Redirect if post not found
        return;
    }

    // Update page title
    document.title = `${post.title} - BlogSpace`;

    // Populate post content
    document.getElementById("post-title").textContent = post.title;
    document.getElementById("post-date").textContent = new Date(
        post.date
    ).toLocaleDateString();
    document.getElementById("post-category").textContent = post.category;
    document.getElementById("post-content").innerHTML = post.content;

    // go back button functionality
    const buttonRef = document.getElementById("back-button");
    buttonRef.addEventListener("click", () => {
        window.history.back();
    });
});
