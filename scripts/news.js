"use strict";
// Kiểm tra điều kiện chỉ khi có User đăng nhập
if (currentUser) {
  // Tạo các biến
  const newsContainerEl = document.querySelector("#news-container");
  const pageNumberEl = document.querySelector("#page-num");
  const prevBtn = document.querySelector("#btn-prev");
  const nextBtn = document.querySelector("#btn-next");
  let totalResults = 0;

  // Hàm hiển thị tin tức
  const displayNewsList = function (data) {
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
    getDataNews("us", --pageNumberEl.textContent);
  });

  // Bắt sự kiện khi nhấn vào nút Next
  nextBtn.addEventListener("click", function () {
    getDataNews("us", ++pageNumberEl.textContent);
  });

  // Hàm lấy dữ liệu từ API
  const getDataNews = async function (country, page) {
    try {
      const res = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${country}&category=${currentUser.category}&pageSize=${currentUser.pagesize}&page=${page}&apiKey=b27e732c9a124122bacbe213f85f03d9`
      );
      const data = await res.json();
      displayNewsList(data);
      console.log(data);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  getDataNews("us", 1);
} else {
  alert("Vui lòng đăng nhập để sử dụng ứng dụng!");
  window.location.href = "../index.html";
}
