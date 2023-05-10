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
  moviescontroller.DataTrendingMovies
);

router.get(
  "/trending/:usertoken",
  isAuthen.AuthenticationToken,
  moviescontroller.DataTrendingMovies
);

// router.get("/movies/top-rate", moviescontroller.DataRatingMovies);

router.get(
  "/highrating/:numberpage/:usertoken",
  isAuthen.AuthenticationToken,
  moviescontroller.DataRatingMovies
);

router.get(
  "/highrating/:usertoken",
  isAuthen.AuthenticationToken,
  moviescontroller.DataRatingMovies
);

// router.get("/movies/discover", moviescontroller.DataGenreMovies5);

router.get(
  "/discover/:numberpage/:usertoken/:GenreId",
  isAuthen.AuthenticationToken, // /movies/discover/1/8qlOkxz4wq
  moviescontroller.DataGenreMovies
);

router.get(
  "/discover/:usertoken/:GenreId",
  isAuthen.AuthenticationToken, // /movies/discover/1/8qlOkxz4wq
  moviescontroller.DataGenreMovies
);

module.exports = router;
