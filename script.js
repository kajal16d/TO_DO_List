const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const categorySelect = document.getElementById('category');
const prioritySelect = document.getElementById('priority');

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <div class="task-content">
        <span>${task.text}</span>
        <div class="meta">Category: ${task.category} | Priority: ${task.priority}</div>
      </div>
      <div class="actions">
        <button class="complete">${task.completed ? "Undo" : "Complete"}</button>
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
      </div>
    `;

    // Event: Complete/Undo
    li.querySelector('.complete').addEventListener('click', () => {
      task.completed = !task.completed;
      saveAndRender();
    });

    // Event: Edit
    li.querySelector('.edit').addEventListener('click', () => {
      const newText = prompt("Edit your task", task.text);
      if (newText) {
        task.text = newText.trim();
        saveAndRender();
      }
    });

    // Event: Delete
    li.querySelector('.delete').addEventListener('click', () => {
      if (confirm("Delete this task?")) {
        tasks.splice(index, 1);
        saveAndRender();
      }
    });

    taskList.appendChild(li);
  });
}

function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

taskForm.addEventListener("submit", e => {
  e.preventDefault();
  const text = taskInput.value.trim();
  const category = categorySelect.value;
  const priority = prioritySelect.value;

  if (text !== "") {
    tasks.push({ text, category, priority, completed: false });
    taskInput.value = "";
    saveAndRender();
  }
});

// Initial render
renderTasks();
