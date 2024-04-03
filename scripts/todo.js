"use strict";
// Kiểm tra điều kiện chỉ khi có User đăng nhập
if (currentUser) {
  // Tạo các biến
  const inputTaskEl = document.querySelector("#input-task");
  const addBtn = document.querySelector("#btn-add");
  const todolistContainer = document.querySelector("#todo-list");
  const liEl = document.querySelectorAll("li");

  // Gọi hàm
  displayTodoList();

  // Bắt sự kiện khi nhấn vào nút add
  addBtn.addEventListener("click", function () {
    // Tạo mới một todo lưu trữ các giá trị trên form
    const todos = new Task(inputTaskEl.value, currentUser.userName, false);

    // Hàm kiểm tra điều kiện
    function validateData() {
      let isValidate = true;
      if (inputTaskEl.value.trim() === "") {
        alert("Vui lòng nhập Title!");
        isValidate = false;
      }
      return isValidate;
    }

    const validate = validateData();

    // Trường hợp xảy ra khi thỏa mãn điều kiện hoặc không
    if (validate) {
      todoArr.push(todos);
      saveToStorage("todoArr", todoArr);
      displayTodoList();
      alert("Cập nhật Task thành công");
      inputTaskEl.value = "";
    }
  });

  // Hàm hiển thị các Todo
  function displayTodoList() {
    let html = "";
    todoArr
      .filter(function (task) {
        return task.owner === currentUser.userName;
      })
      .forEach(function (task) {
        html += `<li class=${task.isDone ? "checked" : ""}>
${task.task}
<span class="close">×</span>
</li>`;
        todolistContainer.innerHTML = html;
      });
    eventToggleAndDeleteTask();
  }

  // Hàm bắt các sự kiện nhấn vào và delete trên phần tử
  function eventToggleAndDeleteTask() {
    document.querySelectorAll("#todo-list li").forEach(function (liEl) {
      liEl.addEventListener("click", function (e) {
        if (!e.target.classList.contains("close")) {
          const todo = todoArr.find(function (todoItem) {
            return (
              todoItem.owner === currentUser.userName &&
              todoItem.task === liEl.textContent[1]
            );
          });
          liEl.classList.toggle("checked");
          todo.isDone = liEl.classList.contains("checked") ? true : false;
          saveToStorage("todoArr", todoArr);
        } else {
          const isDelete = confirm("Bạn có chắc chắn muốn xóa không?");
          if (isDelete) {
            const index = todoArr.findIndex(function (todoItem) {
              return (
                todoItem.owner === currentUser.userName &&
                todoItem.task === liEl.textContent[1]
              );
            });
            todoArr.splice(index, 1);
            saveToStorage("todoArr", todoArr);
            displayTodoList();
          }
        }
      });
    });
  }
} else {
  alert("Vui lòng đăng nhập để sử dụng ứng dụng!");
  window.location.href = "../index.html";
}
