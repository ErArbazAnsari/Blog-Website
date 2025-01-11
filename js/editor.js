document.addEventListener("DOMContentLoaded", () => {
    // Check if user is logged in
    if (!localStorage.getItem("user")) {
        window.location.href = "/login.html";
        return;
    }

    const toolbar = document.querySelector(".editor-toolbar");
    const editor = document.getElementById("editor");
    const form = document.getElementById("post-form");

    // Handle toolbar buttons
    toolbar.addEventListener("click", (e) => {
        if (
            e.target.tagName === "BUTTON" ||
            e.target.parentElement.tagName === "BUTTON"
        ) {
            e.preventDefault();
            const button =
                e.target.tagName === "BUTTON"
                    ? e.target
                    : e.target.parentElement;
            const command = button.dataset.command;

            if (command === "h1" || command === "h2") {
                document.execCommand("formatBlock", false, command);
            } else {
                document.execCommand(command, false, null);
            }
        }
    });

    // Handle form submission
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const user = JSON.parse(localStorage.getItem("user"));
        const title = document.getElementById("title").value;
        const category = document.getElementById("category").value;
        const content = editor.innerHTML;
        const excerpt = content.replace(/<[^>]*>/g, "").slice(0, 150) + "...";

        const post = {
            id: Date.now(),
            userId: user.id,
            author: user.name,
            title,
            category,
            date: new Date().toISOString(),
            content,
            excerpt,
        };

        // Save to localStorage
        const savedPosts = JSON.parse(localStorage.getItem("blog_posts")) || [];
        savedPosts.unshift(post); // Add to beginning of array
        localStorage.setItem("blog_posts", JSON.stringify(savedPosts));

        window.location.href = `/post.html?id=${post.id}`;
    });
});
