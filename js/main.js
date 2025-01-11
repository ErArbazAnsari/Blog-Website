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

// const posts = [
//     {
//         id: 1,
//         userId: 2,
//         author: "John Doe",
//         title: "New Advancements in AI Technology",
//         category: "Technology",
//         date: "2021-11-10T10:02:43Z",
//         content:
//             "Artificial Intelligence (AI) has made significant strides in recent years. From natural language processing to machine learning, AI is transforming industries and creating new opportunities. One of the most notable advancements is in the field of deep learning, where neural networks are trained to perform complex tasks such as image and speech recognition. These advancements have led to the development of more sophisticated AI systems that can understand and respond to human language, making them more useful in a variety of applications. Additionally, AI is being used to improve decision-making processes in industries such as healthcare, finance, and transportation. For example, AI algorithms can analyze large datasets to identify patterns and trends that would be difficult for humans to detect. This can lead to more accurate diagnoses in healthcare, better investment strategies in finance, and more efficient routing in transportation. As AI technology continues to evolve, it is likely that we will see even more innovative applications that will further transform our world.",
//         excerpt:
//             "Discover the latest advancements in AI technology and how they are revolutionizing various sectors.",
//     },
//     {
//         id: 2,
//         userId: 3,
//         author: "Jane Smith",
//         title: "Top 10 Travel Destinations for 2023",
//         category: "Travel",
//         date: "2021-11-10T10:02:43Z",
//         content:
//             "As travel restrictions ease, 2023 promises to be a year of exploration. From the pristine beaches of Bali to the historic streets of Rome, here are the top 10 travel destinations you should consider. Bali, Indonesia, is known for its stunning beaches, vibrant culture, and lush landscapes. It's a perfect destination for those looking to relax and immerse themselves in nature. Rome, Italy, offers a rich history and an abundance of cultural landmarks, including the Colosseum, Vatican City, and the Pantheon. For those seeking adventure, New Zealand's South Island is a must-visit, with its breathtaking scenery and outdoor activities such as hiking, skiing, and bungee jumping. Other top destinations include Tokyo, Japan, for its blend of traditional and modern attractions; Cape Town, South Africa, for its stunning coastline and diverse wildlife; and Reykjavik, Iceland, for its unique landscapes and natural wonders like the Northern Lights. Whether you're looking for relaxation, adventure, or cultural experiences, these destinations offer something for every traveler.",
//         excerpt:
//             "Plan your next adventure with our guide to the top 10 travel destinations for 2023.",
//     },
//     {
//         id: 3,
//         userId: 4,
//         author: "Alice Johnson",
//         title: "Healthy Eating Habits for a Better Life",
//         category: "Health",
//         date: "2021-11-10T10:02:43Z",
//         content:
//             "Maintaining a balanced diet is crucial for overall health. Learn about the benefits of incorporating fruits, vegetables, and whole grains into your daily meals. A healthy diet can help prevent chronic diseases such as heart disease, diabetes, and obesity. It can also improve your mood, energy levels, and overall well-being. To start, focus on eating a variety of nutrient-dense foods, including plenty of fruits and vegetables. These foods are rich in vitamins, minerals, and antioxidants that support your body's functions and protect against disease. Whole grains, such as brown rice, quinoa, and oats, provide essential fiber and nutrients that help regulate digestion and maintain stable blood sugar levels. Additionally, lean proteins, such as chicken, fish, beans, and legumes, are important for muscle repair and growth. It's also important to limit your intake of processed foods, sugary drinks, and unhealthy fats, which can contribute to weight gain and other health issues. By making small, sustainable changes to your diet, you can improve your health and enjoy a better quality of life.",
//         excerpt:
//             "Adopt healthy eating habits to improve your quality of life and well-being.",
//     },
//     {
//         id: 4,
//         userId: 5,
//         author: "Bob Brown",
//         title: "The Future of Electric Vehicles",
//         category: "Automotive",
//         date: "2021-11-10T10:02:43Z",
//         content:
//             "Electric vehicles (EVs) are gaining popularity as a sustainable alternative to traditional cars. Explore the latest innovations in EV technology and what the future holds for this industry. One of the key advancements in EV technology is the development of more efficient and longer-lasting batteries. This has led to increased driving ranges and shorter charging times, making EVs more practical for everyday use. Additionally, the expansion of charging infrastructure has made it easier for EV owners to find charging stations, further reducing range anxiety. Another important development is the integration of autonomous driving features, which can enhance safety and convenience for drivers. As governments around the world implement stricter emissions regulations, automakers are investing heavily in EV technology to meet these standards. This has resulted in a wider variety of EV models available on the market, from compact cars to SUVs and trucks. The future of the automotive industry is likely to see a continued shift towards electric mobility, with advancements in technology and infrastructure making EVs an increasingly attractive option for consumers.",
//         excerpt:
//             "Electric vehicles are set to revolutionize the automotive industry. Learn more about their future.",
//     },
//     {
//         id: 5,
//         userId: 6,
//         author: "Charlie Davis",
//         title: "How to Start Investing in Stocks",
//         category: "Finance",
//         date: "2021-11-10T10:02:43Z",
//         content:
//             "Investing in stocks can be a great way to build wealth over time. This beginner's guide covers the basics of stock market investing, including how to choose stocks and manage your portfolio. The first step is to understand the different types of stocks available, such as common stocks, preferred stocks, and ETFs. Common stocks represent ownership in a company and typically come with voting rights, while preferred stocks offer fixed dividends and have priority over common stocks in the event of liquidation. ETFs, or exchange-traded funds, are a type of investment fund that holds a diversified portfolio of stocks and can be traded on stock exchanges. Once you have a basic understanding of the types of stocks, you can start researching individual companies and industries to identify potential investment opportunities. It's important to consider factors such as a company's financial health, growth potential, and competitive position in the market. Diversifying your portfolio by investing in a mix of stocks from different sectors can help reduce risk. Additionally, it's important to have a long-term investment strategy and avoid making impulsive decisions based on short-term market fluctuations. By following these principles, you can build a successful stock portfolio and achieve your financial goals.",
//         excerpt:
//             "Get started with stock market investing with our comprehensive beginner's guide.",
//     },
//     {
//         id: 6,
//         userId: 7,
//         author: "Diana Evans",
//         title: "The Benefits of Yoga for Mental Health",
//         category: "Health",
//         date: "2021-11-10T10:02:43Z",
//         content:
//             "Yoga is not only beneficial for physical health but also for mental well-being. Discover how practicing yoga can help reduce stress, improve mood, and enhance overall mental health. One of the key benefits of yoga is its ability to reduce stress and promote relaxation. Through a combination of physical postures, breathing exercises, and meditation, yoga helps activate the body's relaxation response, which can lower cortisol levels and reduce feelings of anxiety. Additionally, yoga has been shown to improve mood and increase feelings of happiness and well-being. This is partly due to the release of endorphins, which are natural mood-boosting chemicals produced by the body during physical activity. Yoga also encourages mindfulness, which involves paying attention to the present moment without judgment. This can help individuals develop a greater sense of self-awareness and improve their ability to manage negative thoughts and emotions. Furthermore, regular yoga practice has been linked to improved sleep quality, increased energy levels, and enhanced cognitive function. By incorporating yoga into your daily routine, you can experience these mental health benefits and improve your overall quality of life.",
//         excerpt:
//             "Explore the mental health benefits of incorporating yoga into your daily routine.",
//     },
//     {
//         id: 7,
//         userId: 8,
//         author: "Eve Foster",
//         title: "The Impact of Climate Change on Wildlife",
//         category: "Environment",
//         date: "2021-11-10T10:02:43Z",
//         content:
//             "Climate change is having a profound impact on wildlife around the world. Learn about the challenges faced by various species and what can be done to protect them. Rising temperatures, changing precipitation patterns, and more frequent extreme weather events are altering habitats and disrupting ecosystems. Many species are struggling to adapt to these rapid changes, leading to shifts in distribution, behavior, and population dynamics. For example, polar bears are losing their sea ice habitat, which is essential for hunting seals, their primary food source. Similarly, coral reefs are experiencing widespread bleaching due to warmer ocean temperatures, threatening the diverse marine life that depends on them. In addition to habitat loss, climate change is also affecting the timing of natural events, such as migration and breeding. This can lead to mismatches between species and their food sources, further exacerbating the challenges they face. To protect wildlife from the impacts of climate change, it is crucial to reduce greenhouse gas emissions and implement conservation strategies that enhance the resilience of ecosystems. This includes protecting and restoring habitats, creating wildlife corridors, and supporting sustainable land and water management practices. By taking action to address climate change, we can help safeguard biodiversity and ensure the survival of countless species.",
//         excerpt:
//             "Understand the effects of climate change on wildlife and the measures needed to safeguard biodiversity.",
//     },
//     {
//         id: 8,
//         userId: 9,
//         author: "Frank Green",
//         title: "The Rise of Remote Work",
//         category: "Business",
//         date: "2021-11-10T10:02:43Z",
//         content:
//             "The COVID-19 pandemic has accelerated the adoption of remote work across various industries. Companies have realized the benefits of allowing employees to work from home, including increased productivity, reduced overhead costs, and improved work-life balance. However, remote work also presents challenges such as maintaining team cohesion, ensuring effective communication, and managing employee well-being. As businesses continue to adapt to this new normal, it is essential to develop strategies that address these challenges while leveraging the advantages of remote work. This includes investing in technology that facilitates remote collaboration, implementing flexible work policies, and providing support for employees' mental and physical health. The future of work is likely to be a hybrid model, combining the best aspects of remote and in-office work to create a more dynamic and resilient workforce. By embracing this new way of working, companies can attract and retain top talent, foster innovation, and remain competitive in an ever-changing business landscape.",
//         excerpt:
//             "Explore the rise of remote work, its benefits, challenges, and the future of a hybrid work model.",
//     },
// ];

// localStorage.setItem("blog_posts", JSON.stringify(posts));

// Function to create a post card element
function createPostCard(post) {
    const article = document.createElement("article");
    article.className = "post-card";

    article.innerHTML = `
        <div class="post-card-content">
            <h2 class="post-title">
                <a href="/post.html?id=${post.id}" class="post-link">${
        post.title
    }</a>
            </h2>
            <div class="post-meta">
                <time class="post-date">${new Date(
                    post.date
                ).toLocaleDateString()}</time>
                <span class="post-category">${post.category}</span>
            </div>
            <p class="post-excerpt">${post.excerpt}</p>
        </div>
    `;

    return article;
}

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
