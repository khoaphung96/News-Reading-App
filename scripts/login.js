"use strict";

// Tạo các biến
const userNameEl = document.querySelector("#input-username");
const passwordEl = document.querySelector("#input-password");
const loginBtn = document.querySelector("#btn-submit");

// Bắt sự kiện khi nhấn vào nút Login
loginBtn.addEventListener("click", function () {
  // Hàm kiểm tra điều kiện
  function validateData() {
    let isValidate = true;
    if (userNameEl.value.trim() === "") {
      alert("Vui lòng nhập User Name!");
      isValidate = false;
    }
    if (passwordEl.value.trim() === "") {
      alert("Vui lòng nhập Password!");
      isValidate = false;
    }

    return isValidate;
  }

  const validate = validateData();

  // Trường hợp xảy ra khi thỏa mãn điều kiện hoặc không
  if (validate) {
    const user = userArr.find(
      (item) =>
        userNameEl.value === item.userName && passwordEl.value === item.password
    );
    console.log(user);
    if (user) {
      alert("Đăng nhập thành công!");
      saveToStorage("currentUser", user);
      window.location.href = "../index.html";
    } else {
      alert("Thông tin đăng nhập không chính xác!");
    }
  }
});
