// Định nghĩa nhiệm vụ của các route và cũng như sắp xếp sự phản hồi và gửi yêu cầu

const express = require("express");

const path = require("path");

const moviescontroller = require("../controllers/movies");

const isAuthen = require("../middleware/AuthenToken");

const router = express.Router();
// router.get("/movies/trending", moviescontroller.DataTrendingMovies);

router.get(
  "/trending/:numberpage/:usertoken",
  isAuthen.AuthenticationToken,
  moviescontroller.DataTrendingMovies // // http://localhost:8080/api/movies/trending/2/8qlOkxz4wq
);

router.get(
  "/trending/:usertoken",
  isAuthen.AuthenticationToken,
  moviescontroller.DataTrendingMovies
);

// router.get("/movies/top-rate", moviescontroller.DataRatingMovies);

router.get(
  "/top-rate/:numberpage/:usertoken",
  isAuthen.AuthenticationToken,
  moviescontroller.DataRatingMovies // http://localhost:8080/api/movies/top-rate/2/8qlOkxz4wq
);

router.get(
  "/top-rate/:usertoken",
  isAuthen.AuthenticationToken,
  moviescontroller.DataRatingMovies
);

// router.get("/movies/discover", moviescontroller.DataGenreMovies5);

router.get(
  "/discover/:numberpage/:GenreId/:usertoken",
  isAuthen.AuthenticationToken, // http://localhost:8080/api/movies/discover/2/18/8qlOkxz4wq
  moviescontroller.DataGenreMovies
);

router.get(
  "/discover/:GenreId/:usertoken",
  isAuthen.AuthenticationToken, // http://localhost:8080/api/movies/discover/18/8qlOkxz4wq
  moviescontroller.DataGenreMovies
);

module.exports = router;
