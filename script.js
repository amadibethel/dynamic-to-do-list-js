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
