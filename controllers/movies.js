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
    const genreParam = req.body.genre;
    const mediatype = req.body.mediatype;
    const language = req.body.language;
    const year = req.body.year;

    let i = 20;
    let start = 0;
    if (pageNumber > 1) {
      i = pageNumber * 20 + 1; // Lấy i để làm đối số bắt đầu cắt, để phân trang
      start = i - 20;
    }

    if (!genreParam && !mediatype && !language && !year) {
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
    }
    if (genreParam || mediatype || language || year) {
      // Lấy các số này định ngh
      const dataAdvance = Movies.searchData(searchData, start, i);
      const dataGenre = Movies.searchAdvanceData();

      const genreId =
        genreParam &&
        dataGenre.genresId.find(
          (genre) => genre.name.toLowerCase() === genreParam
        );

      const movieFindCustomer = () => {
        let sortmovies;

        if (language) {
          sortmovies = dataAdvance.results.filter(
            (e) => e.original_language === language
          );
        }
        if (mediatype) {
          sortmovies = dataAdvance.results.filter(
            (e) => e.media_type === mediatype
          );
        }
        if (year) {
          sortmovies = dataAdvance.results.filter(
            (e) =>
              new Date(e.first_air_date).getFullYear() ||
              new Date(e.release_date).getFullYear() === Number(year)
          );
        }
        return sortmovies;
      };
      if (!movieFindCustomer()) {
        throw new Error("Not found movie");
      }
      const resultsMovie =
        genreParam &&
        movieFindCustomer().filter((film) =>
          film.genre_ids.find((e) => e === genreId.id)
        );
      // console.log(resultsMovie);
      return res.status(200).json(resultsMovie || movieFindCustomer());
    }
  } catch (error) {
    res.status(400).json({ message: "Not found keyword param" });
    console.error(error);
  }

  // throw new Error("Not found movie match genreId");
};
