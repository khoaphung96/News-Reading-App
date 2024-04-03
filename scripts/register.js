"use strict";

// Tạo các biến
const firstNameEl = document.querySelector("#input-firstname");
const lastNameEl = document.querySelector("#input-lastname");
const userNameEl = document.querySelector("#input-username");
const passwordEl = document.querySelector("#input-password");
const confirmPasswordEl = document.querySelector("#input-password-confirm");
const registerBtn = document.querySelector("#btn-submit");

// bắt sự kiện khi nhấn vào nút Register
registerBtn.addEventListener("click", function () {
  //
  // const data = {
  //   firstName: firstNameEl.value,
  //   lastName: lastNameEl.value,
  //   userName: userNameEl.value,
  //   password: passwordEl.value,
  //   confirmPassword: passwordEl.value,
  // };

  // Tạo biến để lưu các giá trị trên form
  const user = new User(
    firstNameEl.value,
    lastNameEl.value,
    userNameEl.value,
    passwordEl.value
  );

  // Hàm kiểm tra điều kiện
  function validateData(user) {
    let isValidate = true;
    if (firstNameEl.value.trim() === "") {
      alert("Vui lòng nhập First Name!");
      isValidate = false;
    }
    if (lastNameEl.value.trim() === "") {
      alert("Vui lòng nhập Last Name!");
      isValidate = false;
    }
    if (userNameEl.value.trim() === "") {
      alert("Vui lòng nhập User Name!");
      isValidate = false;
    }
    if (passwordEl.value.trim() === "") {
      alert("Vui lòng nhập Password!");
      isValidate = false;
    }
    if (passwordEl.value.length < 9) {
      alert("Password phải có ít nhất 9 ký tự!");
      isValidate = false;
    }
    if (confirmPasswordEl.value.trim() === "") {
      alert("Vui lòng nhập Confirm Password!");
      isValidate = false;
    }
    if (confirmPasswordEl.value !== passwordEl.value) {
      alert("Mật khẩu xác nhận phải giống với mật khẩu!");
      isValidate = false;
    }

    for (let i = 0; i < userArr.length; i++) {
      if (userNameEl.value === userArr[i].userName) {
        alert("User Name đã tồn tại!");
        isValidate = false;
        break;
      }
    }

    return isValidate;
  }

  const validate = validateData(user);

  // Trường hợp xảy ra khi thỏa mãn điều kiện hoặc không
  if (validate) {
    userArr.push(user);
    saveToStorage("userArr", userArr);
    alert("Đăng ký thành công!");
    window.location.href = "../pages/login.html";
  }
});
