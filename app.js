// Thư viện có sẵn từ node js
const path = require("path");

// Thư viện tải về trên npm
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));

// Kết nối route
const isAuthen = require("./middleware/AuthenToken");
const genreList = require("./routes/movies");
const Search = require("./routes/SearchMovies");
const moviescontroller = require("./controllers/movies");

// const isAuthenroute = require("./routes/token");
const pathAPIMovies = ["search", "video", "discover", "trending", "highrating"];

// Định nghĩa route trong app

pathAPIMovies.forEach((pathdynamic) => {
  app.use(
    `/api/movies/${pathdynamic}/:numberpage/:usertoken`,
    (req, res, next) => {
      if (req.params.numberpage > 0) {
        next();
      }
      // try {
      //   router.get(
      //     `/api/movies/${pathdynamic}/:usertoken`,
      //     (req, res, next) => {
      //       if (pathdynamic === "trending") {
      //         return (
      //           isAuthen.AuthenticationToken,
      //           moviescontroller.DataTrendingMovies
      //         );
      //       }
      //       if (pathdynamic === "highrating") {
      //         return (
      //           isAuthen.AuthenticationToken,
      //           moviescontroller.DataRatingMovies
      //         );
      //       }
      //       // if (pathdynamic === 'discover') {
      //       //   return genreList
      //       // }
      //     }
      //   );
      // } catch (error) {
      //   next(error);
      // }
    }
  );
});

pathAPIMovies.forEach((pathdynamic) => {
  app.use(`/api/movies/${pathdynamic}`, cors(), Search); // 8qlOkxz4wq
});
pathAPIMovies.forEach((pathdynamic) => {
  try {
    app.use(
      `/api/movies/${pathdynamic}/:pagenumber`,
      cors(),
      (req, res, next) => {
        if (Number(req.params)) {
          res.status(401).json({ message: "Unauthorized " });
        }
        if (!Number(req.params)) {
          if (pathdynamic === "video") {
            res.status(400).json({ message: "Not found film_id parrams" });
          }
          if (pathdynamic === "search") {
            res.status(400).json({ message: "Not found keyword parram" });
          }
          if (pathdynamic === "discover") {
            res.status(400).json({ message: "Not found gerne parram" });
          }
          if (pathdynamic === "trending") {
            next();
          }
          if (pathdynamic === "highrating") {
            res.status(400).json({ message: "highrating" });
          }
        }
      }
    );
  } catch (error) {
    next(error);
  }
});

app.use(`/api/movies`, cors(), genreList);

pathAPIMovies.forEach((pathdynamic) => {
  app.use(`/api/movies/${pathdynamic}`, cors(), (req, res, next) => {
    res.status(401).json({ message: "Unauthorized" });
  });
});

app.use((req, res, next) => {
  // res.status(404).render("404", { pageTitle: "Page Not Found", path: "/404" });
  res.status(404).json({ message: "route not found!" });
});

app.use((error, req, res, next) => {
  res.send("<h1>Error 505!</h1>");
});

app.listen(8080);

//   console.log("app.js");
//   console.log(req.params);
//   if (!req.params.usertoken) {
//   }
