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
  /*
Nếu tất cả trả về = 0, thì viết như hàm ban đầu + 

Lấy dữ liệu của file genre và file movies list, 
genre sẽ tìm trong file genre

mediatype, language, year sẽ tìm trong file movieList, nếu mà có sẽ xuất ra. Date sẽ dùng hàm new Date để trích xuất năm 

Tạo một cái hàm nhỏ để lọc dữ liệu: dùng hàm filter lọc trong file các mảng có số 0 trả về underfine

Lọc theo 2 cái if ( a && b ) TH1 : all = 0, TH2: ít nhất 1 tham số if ( a || b || c ) {
  trước khi cho vào hàm lọc tổng thì cần phải xem cái này nào bằng 0, ít nhất 1 tham số sai sẽ trả về kết quả json{a: not movie theo data input }

  truyền tham số a, b, c này vào để tìm trong filter (a, b, c có giá trị )
}

Nếu 1TH trả về = 0, thì viết như hàm ban đầu + 
Nếu 2TH trả về = 0, thì viết như hàm ban đầu + 
Nếu 3TH trả về = 0, thì viết như hàm ban đầu + 
Nếu 4TH trả về = 0, thì viết như hàm ban đầu + 

*/

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
