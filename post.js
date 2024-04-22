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
    const postForm = document.getElementById('add-post-form');
  
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
      
    });
  }

function displayPosts() {
    let postHtml = '';
  
    userPosts.forEach((post) => {
        postHtml += `
          <div class="full-card">
            
            <div class="post">
              <i onclick="Toggle()" class="fa-regular fa-heart fa-2xl"></i>
              
            </div>
            <div class="second-cadre">
            <h2>${post.postTitle}</h2>
            <img src="${post.postImage}" alt="${post.postTitle}">
            <p class="contenu">${post.postBody}</p>
            
            
            
<button id="button" class="cardBtn edit" data-post-id="${post.id}"> edit</button>

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

        // Attach event listeners to edit buttons
        document.querySelectorAll('.edit').forEach(editBtn => {
          editBtn.addEventListener('click', function() {
              const postId = editBtn.dataset.postId;
              // console.log("Editing post with ID:", postId);
              editPost(postId);
          });
      });
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

/* edit*/
function editPost(postId) {
  // Find the index of the post to edit
  const postToEditIndex = userPosts.findIndex(post => post.id == postId);

  if (postToEditIndex === -1) {
    console.error("Post not found!");
    return;
  }

  const postToEdit = userPosts[postToEditIndex];

  const editForm = `
    <form class="edit-form" id="formForEdit" style="background-color: #CDD8C4;border: 5px solid #839C99; padding: 20px; margin:20px; border-radius: 5px; text-align: center;">
      <label for="imageURL">Image</label><br>
      <input type="text" id="imageURL1" name="imageURL" required value="${postToEdit.postImage}"><br>

      <label for="postTitle">Title:</label><br>
      <input type="text" id="postTitle1" name="postTitle" required value="${postToEdit.postTitle}"><br>

      <label for="postDescription">Description:</label><br>
      <textarea id="postDescription1" name="postDescription" rows="4" cols="50" required>${postToEdit.postBody}</textarea><br>

      <button type="submit" class="btnStyle">Save</button>
      <button type="button" onclick="cancelEdit()" class="btnStyle">Cancel</button>
    </form>
  `;

  // Append the edit form to the container div
  document.getElementById('edit-form-container').innerHTML = editForm;

  // Add event listener to the form for submitting the edited post
  document.querySelector('.edit-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Update the post in the userPosts array with the new values from the form
    postToEdit.postImage = document.getElementById('imageURL1').value;
    postToEdit.postTitle = document.getElementById('postTitle1').value;
    postToEdit.postBody = document.getElementById('postDescription1').value;

    // Save the updated posts array to localStorage
    localStorage.setItem('userPosts', JSON.stringify(userPosts));

    // Display the updated posts (no need to call displayPosts here)

    // Update the DOM to reflect the edited post (optional)
    const editedPostContainer = document.querySelector(`.full-card[data-post-id="${postId}"]`);
    if (editedPostContainer) {
      editedPostContainer.querySelector('h2').textContent = postToEdit.postTitle;
      editedPostContainer.querySelector('img').src = postToEdit.postImage;
      editedPostContainer.querySelector('.contenu').textContent = postToEdit.postBody;
    } else {
      console.error("Edited post container not found!");
    }

    // Clear the edit form container
    document.getElementById('edit-form-container').innerHTML = '';
  });
}

function cancelEdit() {
  // Clear the edit form container
  document.getElementById('edit-form-container').innerHTML = '';

  // Optionally, you can add logic here to revert any changes made in the form fields
}




