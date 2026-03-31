const API = "http://localhost:3000/api";

let token = localStorage.getItem("token");

const authDiv = document.getElementById("auth");
const appDiv = document.getElementById("app");
const todoList = document.getElementById("todoList");

// Buttons
document.getElementById("registerBtn").addEventListener("click", register);
document.getElementById("loginBtn").addEventListener("click", login);
document.getElementById("logoutBtn").addEventListener("click", logout);
document.getElementById("addTodoBtn").addEventListener("click", createTodo);

if (token) showApp();

function showApp() {
  authDiv.classList.add("hidden");
  appDiv.classList.remove("hidden");
  loadTodos();
}

function logout() {
  localStorage.removeItem("token");
  location.reload();
}

// REGISTER
async function register() {
  const name = regName.value;
  const email = regEmail.value;
  const password = regPassword.value;

  const res = await fetch(API + "/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    token = data.token;
    showApp();
  } else {
    alert("Registration failed");
  }
}

// LOGIN
async function login() {
  const email = loginEmail.value;
  const password = loginPassword.value;

  const res = await fetch(API + "/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    token = data.token;
    showApp();
  } else {
    alert("Login failed");
  }
}

// LOAD TODOS
async function loadTodos() {
  const res = await fetch(API + "/todos", {
    headers: { Authorization: "Bearer " + token }
  });

  const todos = await res.json();

  todoList.innerHTML = "";

  todos.forEach(todo => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span class="${todo.completed ? "done" : ""}">
        ${todo.title}
      </span>

      <div>
        <button onclick="toggleTodo('${todo._id}', ${todo.completed})">✔</button>
        <button onclick="deleteTodo('${todo._id}')">❌</button>
      </div>
    `;

    todoList.appendChild(li);
  });
}

// CREATE
async function createTodo() {
  const title = todoInput.value;

  await fetch(API + "/todos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({ title })
  });

  todoInput.value = "";
  loadTodos();
}

// TOGGLE
async function toggleTodo(id, completed) {
  await fetch(API + "/todos/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({ completed: !completed })
  });

  loadTodos();
}

// DELETE
async function deleteTodo(id) {
  await fetch(API + "/todos/" + id, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token }
  });

  loadTodos();
}