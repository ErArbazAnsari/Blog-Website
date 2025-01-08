// Sample blog posts data (in a real app, this would come from a backend)
const posts = [
    {
        id: 1,
        title: 'Getting Started with Web Development',
        date: '2024-03-20',
        category: 'Technology',
        excerpt: 'Learn the basics of HTML, CSS, and JavaScript to start your web development journey...',
        content: 'Full content here...'
    },
    {
        id: 2,
        title: 'Understanding JavaScript Closures',
        date: '2024-03-22',
        category: 'Programming',
        excerpt: 'Closures are a fundamental concept in JavaScript that every developer should understand...',
        content: 'Full content here...'
    },
    {
        id: 3,
        title: 'A Guide to Responsive Design',
        date: '2024-03-25',
        category: 'Design',
        excerpt: 'Responsive design ensures your website looks great on all devices. Learn the principles and techniques...',
        content: 'Full content here...'
    },
    {
        id: 4,
        title: 'Introduction to Node.js',
        date: '2024-03-28',
        category: 'Backend Development',
        excerpt: 'Node.js allows you to run JavaScript on the server. Discover how to get started with this powerful runtime...',
        content: 'Full content here...'
    },
    {
        id: 5,
        title: 'CSS Grid Layout: A Comprehensive Guide',
        date: '2024-03-30',
        category: 'CSS',
        excerpt: 'CSS Grid Layout is a powerful tool for creating complex web layouts. Learn how to use it effectively...',
        content: 'Full content here...'
    }
];

// Function to create a post card element
function createPostCard(post) {
    const article = document.createElement('article');
    article.className = 'post-card';
    
    article.innerHTML = `
        <div class="post-card-content">
            <h2 class="post-title">
                <a href="/post.html?id=${post.id}" class="post-link">${post.title}</a>
            </h2>
            <div class="post-meta">
                <time class="post-date">${new Date(post.date).toLocaleDateString()}</time>
                <span class="post-category">${post.category}</span>
            </div>
            <p class="post-excerpt">${post.excerpt}</p>
        </div>
    `;
    
    return article;
}

// Function to render all posts
function renderPosts() {
    const postsGrid = document.getElementById('posts-grid');
    if (!postsGrid) return;

    // Get posts from localStorage or use sample data
    const savedPosts = JSON.parse(localStorage.getItem('blog_posts')) || posts;
    
    // Sort posts by date if needed
    const sortSelect = document.getElementById('sort');
    if (sortSelect) {
        savedPosts.sort((a, b) => {
            if (sortSelect.value === 'newest') {
                return new Date(b.date) - new Date(a.date);
            }
            return new Date(a.date) - new Date(b.date);
        });
    }
    
    postsGrid.innerHTML = ''; // Clear existing posts
    savedPosts.forEach(post => {
        postsGrid.appendChild(createPostCard(post));
    });
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const savedPosts = JSON.parse(localStorage.getItem('blog_posts')) || posts;
            const filteredPosts = savedPosts.filter(post => 
                post.title.toLowerCase().includes(searchTerm) || 
                post.excerpt.toLowerCase().includes(searchTerm)
            );
            
            const postsGrid = document.getElementById('posts-grid');
            postsGrid.innerHTML = '';
            filteredPosts.forEach(post => {
                postsGrid.appendChild(createPostCard(post));
            });
        });
    }
}

// Sort functionality
function setupSort() {
    const sortSelect = document.getElementById('sort');
    if (sortSelect) {
        sortSelect.addEventListener('change', renderPosts);
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    renderPosts();
    setupSearch();
    setupSort();
});