"use strict";
// Tạo hàm lưu dữ liệu xuống Local Storage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Tạo hàm lấy dữ liệu từ Local Storage
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// Viết hàm chuyển đổi từ Object sang Instance của User
function parseUser(userData) {
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.userName,
    userData.password,
    userData.pagesize,
    userData.category
  );
  return user;
}

// Viết hàm chuyển đổi từ Object sang Instance của Task
function parseTask(taskData) {
  const task = new Task(taskData.task, taskData.owner, taskData.isDone);
  return task;
}

// Lấy dữ liệu UserArr từ LocalStorage
const users = getFromStorage("userArr") ? getFromStorage("userArr") : [];
console.log(users);

// Chuyển đổi về dạng Class Instance
const userArr = users.map((user) => parseUser(user));
console.log(userArr);

//
let currentUser = getFromStorage("currentUser")
  ? parseUser(getFromStorage("currentUser"))
  : null;
console.log(currentUser);

// Lấy dữ liệu todoArr từ LocalStorage
const todos = getFromStorage("todoArr") ? getFromStorage("todoArr") : [];
console.log(todos);

// Chuyển đổi về dạng Class Instance
const todoArr = todos.map((todo) => parseTask(todo));
console.log(todoArr);
