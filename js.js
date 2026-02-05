// ======================== DOM ELEMENTS ========================
// Get the comment input textarea element
const commentInput = document.getElementById("commentInput");

// Get the submit button element
const Submitbutton = document.getElementById("submitComment");

// Get the comments container div where all comments will be displayed
const commentsDiv = document.getElementById('comments');

// ======================== GLOBAL VARIABLES ========================
// Counter to track comment ID for unique identification
let commentCount = 0;

// ======================== EVENT LISTENERS ========================
// Add event listener to submit button for adding comments
Submitbutton.addEventListener('click', addComment);

// Allow adding comments by pressing Enter (Ctrl+Enter)
commentInput.addEventListener('keypress', (event) => {
  if (event.ctrlKey && event.key === 'Enter') {
    addComment();
  }
});

// ======================== MAIN FUNCTIONS ========================

/**
 * Function to add a new comment to the comments section
 * Gets the comment text from textarea, validates it, and creates the comment HTML
 */
function addComment() {
  // Get and trim the comment text from textarea
  const commentText = commentInput.value.trim();
  
  // Validate that comment is not empty
  if (!commentText) {
    alert('Please enter a comment!');
    return;
  }

  // Increment comment counter for unique ID
  commentCount++;

  // Create main container for the entire comment item
  const commentContainer = document.createElement('div');
  commentContainer.className = 'comment-item'; // Apply CSS styling
  commentContainer.id = `comment-${commentCount}`; // Unique ID for each comment

  // Create paragraph element for comment text
  const newComment = document.createElement('p');
  newComment.className = 'comment-text'; // Apply CSS styling
  newComment.textContent = commentText; // Set the comment text content

  // Create a container for actions (remove button and timestamp)
  const actionsContainer = document.createElement('div');
  actionsContainer.className = 'comment-actions'; // Apply CSS styling

  // Create timestamp showing when comment was added
  const timestamp = document.createElement('span');
  timestamp.className = 'comment-time'; // Apply CSS styling
  timestamp.textContent = getFormattedTime(); // Get current time formatted

  // Create Remove button for deleting the comment
  const removeBtn = document.createElement('button');
  removeBtn.className = 'remove-btn'; // Apply CSS styling
  removeBtn.textContent = '🗑️ Remove'; // Button text with icon

  // Add event listener to remove button
  // When clicked, removes this comment from the DOM
  removeBtn.addEventListener('click', () => {
    // Fade out animation before removal
    commentContainer.style.animation = 'slideIn 0.4s ease-out reverse';
    setTimeout(() => {
      commentsDiv.removeChild(commentContainer);
    }, 400);
  });

  // Append comment text to actions container
  actionsContainer.appendChild(newComment);
  
  // Create separator line for visual separation
  const hr = document.createElement('hr');
  hr.style.margin = '15px 0';
  hr.style.border = 'none';
  hr.style.borderTop = '1px solid #eee';

  // Append all elements to comment container in order
  commentContainer.appendChild(actionsContainer);
  commentContainer.appendChild(hr); // Separator line
  
  // Create bottom actions row
  const bottomActions = document.createElement('div');
  bottomActions.style.display = 'flex';
  bottomActions.style.justifyContent = 'space-between';
  bottomActions.style.alignItems = 'center';
  bottomActions.appendChild(timestamp);
  bottomActions.appendChild(removeBtn);
  
  commentContainer.appendChild(bottomActions);

  // Append the entire comment container to the comments div
  commentsDiv.appendChild(commentContainer);

  // Clear the textarea after successful comment submission
  commentInput.value = '';
  
  // Focus back on textarea for continuous typing
  commentInput.focus();
}

/**
 * Function to get formatted current time
 * Returns time in HH:MM format
 */
function getFormattedTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0'); // Get hours with leading zero
  const minutes = String(now.getMinutes()).padStart(2, '0'); // Get minutes with leading zero
  return `${hours}:${minutes}`; // Return formatted time string
}
