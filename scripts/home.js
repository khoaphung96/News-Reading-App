"use strict";
// Tạo các biến
const loginModalEl = document.querySelector("#login-modal");
const mainContentEl = document.querySelector("#main-content");
const welcomeMessageEl = document.querySelector("#welcome-message");
const btnLogout = document.querySelector("#btn-logout");

// Hàm hiển thị trang chủ
function displayHome() {
  if (currentUser) {
    loginModalEl.style.display = "none";
    mainContentEl.style.display = "block";
    welcomeMessageEl.textContent = `Welcome ${currentUser.firstName}`;
  } else {
    loginModalEl.style.display = "block";
    mainContentEl.style.display = "none";
  }
}

// Gọi hàm
displayHome();

// Bắt sự kiện khi nhấn vào nút Logout
btnLogout.addEventListener("click", function () {
  const isLogout = confirm("Bạn có chắc chắn muốn đăng xuất?");
  if (isLogout) {
    currentUser = null;
    saveToStorage("currentUser", currentUser);
    displayHome();
  }
});
