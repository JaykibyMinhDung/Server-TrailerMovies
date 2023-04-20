// Thư viện có sẵn từ node js
const path = require("path");

// Thư viện tải về trên npm
const express = require("express");

const app = express();

// Định nghĩa cấu hình cho tệp view ( React js )

// Kết nối hàm với controller
// const controller = require("path_route")

// Kết nối route
const genreList = require("./routes/movies");

// Định nghĩa route trong app
app.use("/api", genreList);

app.use(function (req, res) {
  res.send("Trailer Movies");
});

app.use((req, res, next) => {
  // res.status(404).render("404", { pageTitle: "Page Not Found", path: "/404" });
  res.status(404).send("Page Not Found");
});

app.listen(8080);
