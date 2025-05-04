const addBtn = document.getElementById('add-btn');
const taskInput = document.getElementById('task-input');
const dateInput = document.getElementById('date-input');
const categoryInput = document.getElementById('category-input');
const taskList = document.getElementById('task-list');
const themeToggle = document.getElementById('theme-toggle');

// Load tasks from localStorage
window.onload = () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(task => addTask(task.text, task.date, task.category));
};

addBtn.addEventListener("click", () => {
  const task = taskInput.value.trim();
  const date = dateInput.value;
  const category = categoryInput.value;

  if (task === "" || date === "") return alert("Please enter task and date!");

  addTask(task, date, category);
  saveTaskToLocal(task, date, category);

  taskInput.value = "";
  dateInput.value = "";
});

function addTask(text, date, category) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.innerText = text;

  const dateSpan = document.createElement("span");
  dateSpan.innerText = `📅 ${date}`;
  dateSpan.className = "task-date";

  const catSpan = document.createElement("span");
  catSpan.innerText = category;
  catSpan.className = "task-category";

  const buttonsDiv = document.createElement("div");
  buttonsDiv.className = "task-buttons";

  const editBtn = document.createElement("button");
  editBtn.innerText = "✏️";
  editBtn.className = "edit-btn";
  editBtn.onclick = () => {
    const newText = prompt("Edit task:", span.innerText);
    const newDate = prompt("Edit date:", date);
    const newCategory = prompt("Edit category (💼, 🏠, 📚, 🛍):", category);
    if (newText && newDate && newCategory) {
      deleteFromStorage(text, date, category);
      span.innerText = newText;
      dateSpan.innerText = `📅 ${newDate}`;
      catSpan.innerText = newCategory;
      saveTaskToLocal(newText, newDate, newCategory);
    }
  };

  const delBtn = document.createElement("button");
  delBtn.innerText = "🗑";
  delBtn.onclick = () => {
    li.remove();
    deleteFromStorage(text, date, category);
  };

  buttonsDiv.appendChild(dateSpan);
  buttonsDiv.appendChild(catSpan);
  buttonsDiv.appendChild(editBtn);
  buttonsDiv.appendChild(delBtn);

  li.appendChild(span);
  li.appendChild(buttonsDiv);

  taskList.appendChild(li);
}

function saveTaskToLocal(text, date, category) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text, date, category });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteFromStorage(text, date, category) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(task => !(task.text === text && task.date === date && task.category === category));
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
