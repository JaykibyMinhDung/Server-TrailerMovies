// Xuất các hàm middleware để nhận thông tin và phản hồi thông tin. Nếu là nhận thông tin sẽ chuyển về model để lưu vào dữ liệu. Nếu là gửi thông tin sẽ lấy dữ liệu và truyền vào views, từ đó hiện lên front-end

const Movies = require("../models/genre");

exports.showFile = (req, res, next) => {
  //   res.render("abc", {
  //     pageTitle: "Genrelist movie",
  //     path: "/admin/add-product",
  //     formsCSS: true,
  //     productCSS: true,
  //     activeAddProduct: true,
  //   });
  // res.send(TrendingMovie.take());
  //   Movies.takeTrending((ham) => {
  //     res.send("Loading...");
  //     console.log(ham);
  //   });
  res.status(200).send(Movies.takeTrending());
};

// Tạo hàm lọc lượt xem cao của movielist
