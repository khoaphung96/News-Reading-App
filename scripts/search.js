"use strict";
// Kiểm tra điều kiện chỉ khi có User đăng nhập
if (currentUser) {
  // Tạo các biến
  const newsContainerEl = document.querySelector("#news-container");
  const pageNumberEl = document.querySelector("#page-num");
  const prevBtn = document.querySelector("#btn-prev");
  const nextBtn = document.querySelector("#btn-next");
  const inputQueryEl = document.querySelector("#input-query");
  const navPageNumEl = document.querySelector("#nav-page-num");
  const searchBtn = document.querySelector("#btn-submit");
  let totalResults = 0;
  let keyword = "";
  navPageNumEl.style.display = "none";

  // Hàm hiển thị tin tức
  const displayNewsList = function (data) {
    navPageNumEl.style.display = "block";
    totalResults = data.totalResults;
    checkBtnPrev();
    checkBtnNext();
    let html = "";
    data.articles.forEach(function (article) {
      html += `<div class="card flex-row flex-wrap">
        <div class="card mb-3" style="">
          <div class="row no-gutters">
            <div class="col-md-4">
              <img
                src="${article.urlToImage}" class="card-img"
                alt="${
                  article.urlToImage
                    ? article.description
                    : "No_Image_Available"
                }"
              />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">
                 ${article.title}
                </h5>
                <p class="card-text">
                ${article.content ? article.content : "No_Content_Available"}
                </p>
                <a
                  href="${article.url}"
                  class="btn btn-primary"
                  >View</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>`;
    });
    newsContainerEl.innerHTML = html;
  };

  // Hàm kiểm tra nút Prevous
  const checkBtnPrev = function () {
    if (pageNumberEl.textContent === "1") {
      prevBtn.style.display = "none";
    } else {
      prevBtn.style.display = "block";
    }
  };

  // Hàm kiểm tra nút Next
  const checkBtnNext = function () {
    if (
      pageNumberEl.textContent ===
      String(Math.ceil(totalResults / currentUser.pagesize))
    ) {
      nextBtn.style.display = "none";
    } else {
      nextBtn.style.display = "block";
    }
  };

  // Bắt sự kiện khi nhấn vào nút Prevous
  prevBtn.addEventListener("click", function () {
    getDataNewsByKeyWord(keyword, --pageNumberEl.textContent);
  });

  // Bắt sự kiện khi nhấn vào nút Next
  nextBtn.addEventListener("click", function () {
    getDataNewsByKeyWord(keyword, ++pageNumberEl.textContent);
  });

  // Hàm lấy dữ liệu từ API
  const getDataNewsByKeyWord = async function (keyword, page) {
    try {
      const res = await fetch(
        `https://newsapi.org/v2/everything?q=${keyword}&pageSize=${currentUser.pagesize}&page=${page}&apiKey=b27e732c9a124122bacbe213f85f03d9`
      );
      const data = await res.json();
      if (data.totalResults === 0) {
        throw new Error(
          "Không có bài báo nào phù hợp với từ khóa tìm kiếm, vui lòng thử lại bằng cách nhập từ khóa mới!"
        );
      } else {
        console.log(data);
        displayNewsList(data);
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  // Hàm bắt sự kiện khi nhấn nào nút Search
  searchBtn.addEventListener("click", function () {
    pageNumberEl.textContent = 1;
    newsContainerEl.innerHTML = "";
    if (inputQueryEl.value.trim() === "") {
      alert("Vui lòng nhập keyword để tìm kiếm!");
      navPageNumEl.style.display = "none";
    } else {
      keyword = inputQueryEl.value;
      getDataNewsByKeyWord(keyword, 1);
    }
  });
} else {
  alert("Vui lòng đăng nhập để sử dụng ứng dụng!");
  window.location.href = "../index.html";
}
