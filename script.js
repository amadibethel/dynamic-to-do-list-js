document.addEventListener('DOMContentLoaded', () => {
  // Select the Add Task button, task input, and task list elements
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Function to add a new task
  function addTask() {
    // Get trimmed input value
    const taskText = taskInput.value.trim();

    // If input is empty, alert user and exit function
    if (taskText === '') {
      alert('Please enter a task.');
      return;
    }

    // Create a new <li> element and set its textContent to taskText
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create a new <button> element for removing the task
    const removeBtn = document.createElement('button');
    removeBtn.textContent = "Remove";  // Double quotes as requested
    removeBtn.className = 'remove-btn'; // Single quotes for class name

    // Assign an onclick event to remove the li from taskList when clicked
    removeBtn.onclick = function() {
      taskList.removeChild(li);
    };

    // Append the remove button to the li element
    li.appendChild(removeBtn);

    // Append the li element to the task list
    taskList.appendChild(li);

    // Clear the task input field
    taskInput.value = '';
  }

  // Attach event listener to the addButton to call addTask on click
  addButton.addEventListener('click', addTask);

  // Attach event listener to taskInput for 'keypress' event
  taskInput.addEventListener('keypress', (event) => {
    // If the pressed key is 'Enter', call addTask
    if (event.key === 'Enter') {
      addTask();
    }
  });
});
