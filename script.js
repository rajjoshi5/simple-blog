// Get DOM elements
const postTitle = document.getElementById('post-title');
const postContent = document.getElementById('post-content');
const submitPost = document.getElementById('submit-post');
const postsContainer = document.getElementById('posts');

// Load posts from local storage
let posts = JSON.parse(localStorage.getItem('blog-posts')) || [];

// Function to save posts to local storage
function savePosts() {
    localStorage.setItem('blog-posts', JSON.stringify(posts));
}

// Function to render posts
function renderPosts() {
    postsContainer.innerHTML = '';
    posts.forEach((post, index) => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
            <div class="actions">
                <button onclick="editPost(${index})">Edit</button>
                <button onclick="deletePost(${index})">Delete</button>
            </div>
        `;
        postsContainer.appendChild(postElement);
    });
}

// Function to add a new post
function addPost() {
    const title = postTitle.value.trim();
    const content = postContent.value.trim();
    if (title && content) {
        posts.push({ title, content });
        savePosts();
        renderPosts();
        postTitle.value = '';
        postContent.value = '';
    }
}

// Function to edit a post
function editPost(index) {
    const post = posts[index];
    postTitle.value = post.title;
    postContent.value = post.content;
    posts.splice(index, 1);
    savePosts();
    renderPosts();
}

// Function to delete a post
function deletePost(index) {
    posts.splice(index, 1);
    savePosts();
    renderPosts();
}

// Event listener for submit button
submitPost.addEventListener('click', addPost);

// Initial render
renderPosts();