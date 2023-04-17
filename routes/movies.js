// Định nghĩa nhiệm vụ của các route và cũng như sắp xếp sự phản hồi và gửi yêu cầu

const express = require("express");

const path = require("path");

const moviescontroller = require("../controllers/movies");

const router = express.Router();

router.get("/movies/trending", moviescontroller.showFile);

router.get("/movies/trending/?param=/:number", moviescontroller.showFile);

// router.post("/api/movies/trending", moviescontroller);

module.exports = router;
