const express = require("express");

const path = require("path");

const moviescontroller = require("../controllers/movies");

const isAuthen = require("../middleware/AuthenToken");

const router = express.Router();

router.post(
  "/video/:usertoken/:film_id",
  isAuthen.AuthenticationToken,
  moviescontroller.DataTrailerMovies
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
  "/search/:usertoken/:keyword",
  isAuthen.AuthenticationToken,
  moviescontroller.SearchDataMovies
);

module.exports = router;
