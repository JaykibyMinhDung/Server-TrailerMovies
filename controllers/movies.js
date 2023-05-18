// Xuất các hàm middleware để nhận thông tin và phản hồi thông tin. Nếu là nhận thông tin sẽ chuyển về model để lưu vào dữ liệu. Nếu là gửi thông tin sẽ lấy dữ liệu và truyền vào views, từ đó hiện lên front-end

const Movies = require("../models/AllDataMovies");

exports.DataTrendingMovies = async (req, res, next) => {
  try {
    const pageNumber = req.params.numberpage;
    let i = 20;
    let start = 0;
    if (pageNumber > 1) {
      i = pageNumber * 20 + 1; // Lấy i để làm đối số bắt đầu cắt, để phân trang
      start = i - 20;
    }
    if (!pageNumber) {
      i = 20 + 1; // Lấy i để làm đối số bắt đầu cắt, để phân trang
      start = 0;
    }
    const a = Movies.takeTrending(start, i);
    if (a.results.length > 1) {
      // res.status(200).send(a.results.slice(start, i).map((e) => e.title));
      res.status(200).json(a);
    } else {
      throw new Error("Not find Data");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.DataRatingMovies = (req, res, next) => {
  const pageNumber = req.params.numberpage;
  let i = 20;
  let start = 0;
  if (pageNumber > 1) {
    i = pageNumber * 20 + 1; // Lấy i để làm đối số bắt đầu cắt, để phân trang
    start = i - 20;
  }
  const a = Movies.takeRating(start, i);
  if (a.results.length > 1) {
    res.status(200).json(a);
  } else {
    res.status(400).json("Not data");
    throw 400;
  }
};

exports.DataGenreMovies = (req, res, next) => {
  try {
    const pageNumber = req.params.numberpage;
    const idgenre = req.params.GenreId; // idgenre để lấy dữ liệu tu form
    let i = 20;
    let start = 0;
    if (pageNumber > 1) {
      i = pageNumber * 20 + 1; // Lấy i để làm đối số bắt đầu cắt, để phân trang
      start = i - 20;
    }
    // !Number(pageNumber) ||
    if (!Number(idgenre)) {
      res.status(400).json({ message: "Not found gerne parram" }); // Khác số
      throw 400;
    }
    if (!Movies.takegenre(idgenre)) {
      res.status(400).json({ message: "Not found that gerne id" }); // Số nhưng không có trong dữ liệu
      throw new Error(400);
    }
    // const test = 18; // idgenre fake để lấy dữ liệu
    res.status(200).json(
      Movies.takegenre(idgenre, start, i) // Lay du lieu
    );
  } catch (error) {
    console.log(error.message);
  }
};

exports.DataTrailerMovies = (req, res, next) => {
  try {
    const idvideo = Number(req.params.film_id);
    console.log(req.params);
    if (!idvideo) {
      // res.status(400).json({ message: "Not found film_id param" });
      res.status(404).json({ message: "Not found video" });
      throw new Error("DataTrailerMovies");
    }
    if (!Movies.takeVideoList(idvideo)) {
      res.status(404).json({ message: "Not found video" });
    }
    if (Movies.takeVideoList(idvideo)) {
      res.status(200).json(Movies.takeVideoList(idvideo)); //361743
      // res.status(200).send(req.parser);
    }
  } catch (error) {
    console.error(error);
  }
};

exports.SearchDataMovies = (req, res, next) => {
  try {
    const searchData = req.params.keyword;
    const pageNumber = req.params.numberpage;
    let i = 20;
    let start = 0;
    if (pageNumber > 1) {
      i = pageNumber * 20 + 1; // Lấy i để làm đối số bắt đầu cắt, để phân trang
      start = i - 20;
    }
    const a = Movies.searchData(searchData, start, i);
    if (!searchData) {
      throw new Error("moviescontroler" + searchData);
    }
    if (a.results.length) {
      res.status(200).json(a);
    } else {
      // res.status(400).json({ message: "Not found keyword param" });
      res.status(400).json("Not found keyword param");
    }
  } catch (error) {
    res.status(400).json({ message: "Not found keyword param" });
    console.error(error);
  }

  // console.log(a);
};

// Tạo hàm lọc lượt xem cao của movielist

// exports.DataGenreMovies5 = (req, res, next) => {
//   const genreMovie = new Movies(test); // Truyen du lieu ve model lay du lieu
//   genreMovie.takegenre(); // Tra ve du lieu
//   // console.log(genreMovie.id);
// };
