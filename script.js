// Wait for the entire HTML document to load before running JavaScript
document.addEventListener('DOMContentLoaded', () => {
  // Select the Add Task button
  const addButton = document.getElementById('add-task-btn');
  // Select the task input field
  const taskInput = document.getElementById('task-input');
  // Select the task list container (ul)
  const taskList = document.getElementById('task-list');

  // Function to add a new task to the list
  function addTask() {
    // Get the trimmed value from the input field
    const taskText = taskInput.value.trim();

    // Check if taskText is not empty
    if (taskText === '') {
      // Alert user to enter a task if input is empty
      alert('Please enter a task.');
      return; // Stop function execution
    }

    // Create a new list item (li) element
    const li = document.createElement('li');
    li.textContent = taskText; // Set li text to the task

    // Create a remove button for the task
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove'; // Button text
    removeButton.className = 'remove-btn'; // Add CSS class

    // When remove button is clicked, remove the li from the taskList
    removeButton.onclick = () => {
      taskList.removeChild(li);
    };

    // Append the remove button to the li element
    li.appendChild(removeButton);
    // Append the li element to the taskList
    taskList.appendChild(li);

    // Clear the input field for new tasks
    taskInput.value = '';
  }

  // Add click event listener to the Add Task button
  addButton.addEventListener('click', addTask);

  // Add keypress event listener to the task input to add task on Enter key press
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  // Optionally, invoke addTask on DOMContentLoaded to follow instruction literally
  // (Though usually you wouldn't want to add an empty task on load)
  // addTask(); 
});

document.addEventListener('DOMContentLoaded', () => {
  // Select DOM elements
  const addButton = document.getElementById('add-button');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Load tasks from Local Storage and render them on page load
  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false)); // false = don't save again
  }

  // Add task function: create DOM elements and optionally save to Local Storage
  function addTask(taskText, save = true) {
    const trimmedTask = taskText.trim();
    if (trimmedTask === '') {
      alert('Please enter a task.');
      return;
    }

    // Create li element
    const li = document.createElement('li');
    li.textContent = trimmedTask;

    // Create remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';

    // Onclick event to remove task from DOM and Local Storage
    removeBtn.onclick = () => {
      taskList.removeChild(li);
      // Update Local Storage after removal
      const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      const updatedTasks = storedTasks.filter(task => task !== trimmedTask);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    };

    // Append remove button to li and li to the task list
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // Clear input field
    taskInput.value = '';

    // Save to Local Storage if needed
    if (save) {
      const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      storedTasks.push(trimmedTask);
      localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
  }

  // Event listener for Add Task button click
  addButton.addEventListener('click', () => {
    addTask(taskInput.value);
  });

  // Event listener for Enter key press on input field
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask(taskInput.value);
    }
  });

  // Load tasks when the page loads
  loadTasks();
});
