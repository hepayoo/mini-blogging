// Retrieve stored user posts from local storage (if any)
let storedPosts = localStorage.getItem('userPosts');
const Post = {
    id: "1",
    postImage:"images/Night Beach.jpeg",
    postTitle:"carte",
    postBody:"description",
  };

let userPosts = [];

if (storedPosts) {
  try {
    userPosts = JSON.parse(storedPosts);
  } catch (error) {
    console.error("Error parsing stored posts:", error);
    // Handle potential errors during parsing
    localStorage.removeItem('userPosts'); // Consider clearing corrupt data
  }
}



function addPost() {
    const postForm = document.getElementById('post-form');
  
    postForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent default form submission
  
      const imageURL = document.getElementById('image-url').value.trim(); // Get the image URL
      const postTitle = document.getElementById('title').value.trim(); // Trim leading/trailing whitespace
      const postBody = document.getElementById('description').value.trim();
  
      if (!postTitle) {
        alert("Please enter a title for your post.");
        return; // Prevent further processing if title is missing
      }
  
      const newPost = {
        id: userPosts.length + 1,
        postImage: imageURL,
        postTitle: postTitle,
        postBody: postBody,
      };
  
      userPosts.unshift(newPost);
  
      // Store updated user posts in local storage
      try {
        localStorage.setItem('userPosts', JSON.stringify(userPosts));
      } catch (error) {
        console.error("Error storing posts in local storage:", error);
        alert("There was a problem saving your post. Please try again.");
      }
  
      alert("Post saved successfully!");
  
      // Display the new post
      displayPosts();
  
      // Empty the input fields
      postForm.reset();
  
      setTimeout(() => window.location.href = "./micro.html", 30);
      const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
      modal.hide();
    });
  }

function displayPosts() {
    let postHtml = '';
  
    userPosts.forEach((post) => {
        postHtml += `
          <div class="full-card">
            <button class="comment">Comment</button>
            <div class="post">
              <i onclick="Toggle()" class="fa-regular fa-heart fa-2xl"></i>
              <i class="fa-regular fa-pen-to-square fa-2xl" id="edit"></i>
            </div>
            <div class="second-cadre">
              <h2>${post.postTitle}</h2>
              <img src="${post.postImage}" alt="${post.postTitle}">
              <p class="contenu">${post.postBody}</p>
            </div>
          </div>\n
        `;
      });
  
    // Insert the new post at the beginning of the cards-section
    const cardsSection = document.querySelector('.cards-section');
    if (cardsSection) {
      cardsSection.insertAdjacentHTML('beforebegin', postHtml);
    } else {
      console.error("Element with class 'cards-section' not found!");
    }
  }

document.addEventListener('DOMContentLoaded', function() {
    // Define the displayPosts function here
  // Call displayPosts to display existing posts (optional)
  
  displayPosts();

  // Your code for the addPost function here (already defined)

  addPost();
      });



      
    /* delete post*/


    const postTitleInput = document.getElementById('Title');

    // Add a click event listener to the save button
    saveBtn.addEventListener('click', () => {
      const postTitle = postTitleInput.value;
    
      // Find the post with the given title and remove it from the userPosts array
      userPosts.forEach((post, index) => {
        if (post.postTitle === postTitle) {
          userPosts.splice(index, 1);
          localStorage.setItem('userPosts', JSON.stringify(userPosts));
          displayPosts();
          return;
        }
      });
    
      // Close the modal
      const modal = new bootstrap.Modal(document.getElementById('exampleModal'));
      modal.hide();
    });


   