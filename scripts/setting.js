"use strict";
// Kiểm tra điều kiện chỉ khi có User đăng nhập
if (currentUser) {
  // Tạo các biến
  const pageSizeEl = document.querySelector("#input-page-size");
  const categoryEl = document.querySelector("#input-category");
  const saveSettingsBtn = document.querySelector("#btn-submit");

  // Hàm kiểm tra điều kiện
  function validate() {
    let isValidate = true;
    if (isNaN(Number.parseInt(pageSizeEl.value))) {
      alert("News per page không hợp lệ!");
      isValidate = false;
    }
    if (categoryEl.value === "General") {
      alert("Xin vui lòng chọn category!");
      isValidate = false;
    }
    return isValidate;
  }

  // Bắt sự kiện xảy ra khi nhấn nút save
  saveSettingsBtn.addEventListener("click", function () {
    // Trường hợp xảy ra khi thỏa mãn điều kiện hoặc không
    if (validate()) {
      currentUser.pagesize = Number.parseInt(pageSizeEl.value);
      currentUser.category = categoryEl.value;
      saveToStorage("currentUser", currentUser);
      alert("Thiết lập cài đặt thành công!");
      pageSizeEl.value = "";
      categoryEl.value = "General";
      const index = userArr.findIndex(function (userItem) {
        return userItem.userName === currentUser.userName;
      });
      userArr[index] = currentUser;
      saveToStorage("userArr", userArr);
    }
  });
} else {
  alert("Vui lòng đăng nhập để sử dụng ứng dụng!");
  window.location.href = "../index.html";
}
