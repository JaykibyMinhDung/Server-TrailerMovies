// Định nghĩa nhiệm vụ của các route và cũng như sắp xếp sự phản hồi và gửi yêu cầu

const express = require("express");

const path = require("path");

const moviescontroller = require("../controllers/movies");

const router = express.Router();

// router.get("/movies/trending", moviescontroller.DataTrendingMovies);

router.get(
  "/movies/trending/page=/:numberPage",
  moviescontroller.DataTrendingMovies
);

// router.get("/movies/top-rate", moviescontroller.DataRatingMovies);

router.get(
  "/movies/highrating/page=/:numberPage",
  moviescontroller.DataRatingMovies
);

// router.get("/movies/discover", moviescontroller.DataGenreMovies5);

router.get(
  "/movies/discover/page=/:numberpage/:GenreId", // /movies/discover/page=/1/12345367
  moviescontroller.DataGenreMovies
);

// router.post(
//   "/movies/video", // /movies/discover/page=/1/12345367
//   moviescontroller.DataTrailerMovies
// );

router.get(
  "/movies/video/:film_id", // /movies/discover/page=/1/12345367
  moviescontroller.DataTrailerMovies
);

// router.post("/api/movies/trending", moviescontroller);

module.exports = router;
