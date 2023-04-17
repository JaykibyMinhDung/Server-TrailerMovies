const fs = require("fs");

const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "genreList.json"
);

const getGenrelist = () => {
  fs.readFileSync(p, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(JSON.parse(data));
  });
};

module.exports = class Movies {
  constructor(m) {
    this.movie = m;
  }

  static takeTrending(ham) {
    return JSON.parse(
      fs.readFileSync(p, "utf-8", (err, data) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(data);
      })
    );
  }
};

// Lấy dữ liệu từ data xong thao tác logic để biến dữ liệu thô thành dữ liệu chuẩn để hiện ra màn hình
