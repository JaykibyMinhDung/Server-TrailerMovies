// Xuất các hàm middleware để nhận thông tin và phản hồi thông tin. Nếu là nhận thông tin sẽ chuyển về model để lưu vào dữ liệu. Nếu là gửi thông tin sẽ lấy dữ liệu và truyền vào views, từ đó hiện lên front-end

const Movies = require("../models/genre");

exports.DataTrendingMovies = (req, res, next) => {
  const a = Movies.takeTrending();
  res.status(200).send(a.results.splice(0, 20).map((e) => e.popularity));
};

exports.DataRatingMovies = (req, res, next) => {
  const a = Movies.takeRating();
  if (a.results.length > 1) {
    res.status(200).send(a.results.splice(0, 20).map((e) => e.vote_average));
  } else {
    res.status(400).send("Not data");
  }
};

exports.DataGenreMovies = (req, res, next) => {
  // const pageNumber = req.body.page;
  const idgenre = req.param; // idgenre để lấy dữ liệu tu form
  // let i = 20;
  // if (pageNumber > 1) {
  //   i = (pageNumber - 1) * 20 + 1; // Lấy i để làm đối số bắt đầu cắt, để phân trang
  // }
  // if (idgenre === "") {
  //   res.status(400).send("Not found gerne parram")
  // }
  // if (Movies.takegenre(test).results.length < 1) {
  //   res.status(400).send("Not found that gerne id")
  // }
  const test = 18; // idgenre fake để lấy dữ liệu
  res.status(200).send(
    Movies.takegenre(test) // Lay du lieu
      .results.splice(0, 20) // phan trang
      .map((e) => e.genre_ids) // Kiem tra du lieu dau ra
  );
};

exports.DataTrailerMovies = (req, res, next) => {
  // const idvideo = req.body.id;
  if (!Movies.takeVideoList(361743)) {
    res.status(400).send("Not found film_id parram");
  }
  if (Movies.takeVideoList(361743).length < 1) {
    res.status(404).send("Not found video");
  }
  if (Movies.takeVideoList(361743)) {
    res.status(200).send(Movies.takeVideoList(361743));
  }
};

// Tạo hàm lọc lượt xem cao của movielist

// exports.DataGenreMovies5 = (req, res, next) => {
//   const genreMovie = new Movies(test); // Truyen du lieu ve model lay du lieu
//   genreMovie.takegenre(); // Tra ve du lieu
//   // console.log(genreMovie.id);
// };
