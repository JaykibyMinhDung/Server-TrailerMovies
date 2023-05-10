// Thư viện có sẵn từ node js
const path = require("path");

// Thư viện tải về trên npm
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// Kết nối route
const genreList = require("./routes/movies");
const Search = require("./routes/SearchMovies");
const isAuthenroute = require("./middleware/AuthenToken");

// const isAuthenroute = require("./routes/token");
const pathAPIMovies = ["search", "video", "discover", "trending", "highrating"];

// Định nghĩa route trong app

app.use(`/api/movies`, cors(), genreList);

app.use(`/api/movies`, cors(), Search); // 8qlOkxz4wq

pathAPIMovies.forEach((pathdynamic) => {
  try {
    app.use(
      `/api/movies/${pathdynamic}/:usertoken`,
      cors(),
      isAuthenroute.AuthenticationToken,
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
        }
      }
    );
  } catch (error) {
    next(error);
  }
});

pathAPIMovies.forEach((pathdynamic) => {
  app.use(`/api/movies/${pathdynamic}`, cors(), (req, res, next) => {
    res.status(401).json({ message: "Unauthorized" });
  });
});

app.use((req, res, next) => {
  res.status(404).json({ message: "route not found!" });
});

app.listen(8080);
