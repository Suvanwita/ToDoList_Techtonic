const taskInput = document.getElementById('taskInput');
const deadlineInput = document.getElementById('deadlineInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const quoteElement = document.getElementById('quote');
const taskCountElement = document.getElementById('taskCount');
const addSound = document.getElementById('addSound');
const removeSound = document.getElementById('removeSound');

const quotes = [
    "The future depends on what you do today.",
    "Don't watch the clock; do what it does. Keep going.",
    "The only way to do great work is to love what you do.",
    "Work hard in silence, let your success be your noise.",
    "Hard work beats talent when talent doesn’t work hard."
];

let taskCount = 0;

function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

function updateTaskCount() {
    taskCountElement.textContent = `Tasks remaining: ${taskCount}`;
}

function fadeOut(element) {
    element.style.opacity = 0; // Fade out
    setTimeout(() => {
        element.textContent = getRandomQuote(); // Change the quote
        fadeIn(element); // Fade in the new quote
    }, 500); // Match this duration with the CSS transition duration
}

function fadeIn(element) {
    element.style.opacity = 1; // Fade in
}

function addTask() {
    const taskText = taskInput.value.trim();
    const deadlineText = deadlineInput.value;

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const li = document.createElement('li');
    li.textContent = `${taskText}${deadlineText ? ` (Due: ${new Date(deadlineText).toLocaleDateString()})` : ''}`;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = function() {
        taskList.removeChild(li);
        taskCount--;
        updateTaskCount();
        removeSound.play();
        fadeOut(quoteElement); // Change quote on removal
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);
    taskCount++;
    updateTaskCount();
    addSound.play();
    
    // Clear input boxes and their placeholders
    taskInput.value = '';
    deadlineInput.value = '';
    taskInput.placeholder = 'Add a new task...'; // Reset placeholder
    deadlineInput.placeholder = 'Deadline (optional)'; // Reset placeholder

    fadeOut(quoteElement); // Change quote on addition
}

// Change quote every 5 seconds
setInterval(() => {
    fadeOut(quoteElement);
}, 5000); // 5000 milliseconds = 5 seconds

// Add task on button click
addTaskBtn.addEventListener('click', addTask);

// Initialize with a random quote
quoteElement.textContent = getRandomQuote();
fadeIn(quoteElement);