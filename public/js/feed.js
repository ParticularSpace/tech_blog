// Assuming you have elements with these classes in your HTML
const likeButtons = document.querySelectorAll('.like-button');

// Attach event listeners to like buttons
likeButtons.forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();
    const postId = this.dataset.postId; 
    const likeCountElement = document.querySelector(`.likes-count[data-post-id="${postId}"]`);

    fetch(`api/user/posts/${postId}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ like: !this.classList.contains('liked') }) // Send whether the user is liking or unliking the post
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        if (this.classList.contains('liked')) {
          this.classList.remove('liked');
          // Decrease likes count
          likeCountElement.textContent = parseInt(likeCountElement.textContent) - 1;
        }
        else {
          this.classList.add('liked');
          // Increase likes count
          likeCountElement.textContent = parseInt(likeCountElement.textContent) + 1;
        }
      }
    })
    .catch(error => console.error('Error:', error));
  });
});



// // Attach event listeners to comment buttons
// commentButtons.forEach(button => {
//   button.addEventListener('click', function(e) {
//     e.preventDefault();
//     const postId = this.dataset.postId;
//     const comment = prompt("Enter your comment:");

//     if (comment) {
//       fetch(`/posts/${postId}/comment`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ comment: comment }),
//       })
//       .then(response => response.json())
//       .then(data => {
//         if (data.success) {
//           // Add the comment to the page, or do whatever you want to indicate success
//         }
//       })
//       .catch(error => console.error('Error:', error));
//     }
//   });
// });
