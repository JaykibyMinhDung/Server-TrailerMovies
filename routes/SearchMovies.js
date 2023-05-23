const express = require("express");

const path = require("path");

const moviescontroller = require("../controllers/movies");

const isAuthen = require("../middleware/AuthenToken");

const router = express.Router();

router.post(
  "/video/:usertoken/:film_id",
  isAuthen.AuthenticationToken,
  moviescontroller.DataTrailerMovies // http://localhost:8080/api/movies/video/8qlOkxz4wq/361743
);

// router.get(
//   "/movies/video/:film_id/:usertoken",
//   // (req, res) => {
//   //   console.log(req.params.film_id);
//   // },
//   isAuthen.AuthenticationToken,
//   moviescontroller.DataTrailerMovies
// );

// router.get(
//   "/movies/search/:keyword/:usertoken",
//   (req, res, next) => {
//     res.send(req.params.keyword);
//     // next();
//   },
//   isAuthen.AuthenticationToken,
//   moviescontroller.SearchDataMovies
// );

router.post(
  `/search/:usertoken/:keyword`,
  // /:genre/:mediatype/:language/:year
  // Truyền tham số mặc định vào khi gửi sẽ tránh của việc bỏ trống kí tự dẫn đến sai endpoint. Các tham số khi được gửi mặc định sẽ lọc để biết được đâu là tham số k được người dùng nhập. Chức năng tìm keywords vẫn giữ nguyên nhưng chức năng nâng cao thì đã được cải thiện và không ảnh hưởng đến params
  isAuthen.AuthenticationToken,
  moviescontroller.SearchDataMovies // http://localhost:8080/api/movies/search/8qlOkxz4wq/top gun
);

module.exports = router;
