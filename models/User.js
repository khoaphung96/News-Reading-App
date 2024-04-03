"use strict";
// Tạo class User
const User = class {
  constructor(
    firstName,
    lastName,
    userName,
    password,
    pagesize = 5,
    category = "business"
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.password = password;
    this.pagesize = pagesize;
    this.category = category;
  }
};

// Tạo class Task
const Task = class {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
};
