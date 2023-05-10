const fs = require("fs");

const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "MovieList.json"
);

const g = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "genreList.json"
);

const v = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "videoList.json"
);

const getAlldataMoviesList = (highfunction) => {
  const arr = [];
  fs.readFileSync(p, "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    highfunction(JSON.parse(data));
  });
};

module.exports = class Movies {
  constructor(m) {
    this.id = m;
  }

  static takeTrending() {
    const dataTrending = JSON.parse(
      fs.readFileSync(p, "utf-8", (err, data) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(data);
      })
    );
    const sortDataTrending = dataTrending.sort(
      (a, b) => b.popularity - a.popularity
    );
    return {
      results: sortDataTrending,
      page: 1,
      total_pages:
        sortDataTrending.length > 20
          ? (sortDataTrending.length / 20).toFixed(0)
          : 1,
    };
  }

  static takeRating(ham) {
    const dataRating = JSON.parse(
      fs.readFileSync(p, "utf-8", (err, data) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(data);
      })
    );
    const sortDataRating = dataRating.sort(
      (a, b) => b.vote_average - a.vote_average
    );
    return {
      results: sortDataRating,
      page: 1,
      total_pages:
        sortDataRating.length > 20
          ? (sortDataRating.length / 20).toFixed(0)
          : 1,
    };
  }

  static takegenre(test) {
    const data = JSON.parse(
      fs.readFileSync(p, "utf-8", (err, data) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(data);
      })
    );
    const genreMovies = JSON.parse(
      fs.readFileSync(g, "utf-8", (err) => {
        if (err) {
          console.log(err);
          return;
        }
      })
    );
    const genreName = genreMovies.find((e) => e.id === test); // Lay object genre tuong ung
    const CompareIdGenre = (genreid) => {
      return genreid.find((id) => id === test); // Trả về một genre-id mà khách đã nhập
    };
    const RelateGenreMovies = data.filter((id) => CompareIdGenre(id.genre_ids)); // Trả về toàn bộ movies có genre-id tương ứng
    return {
      results: RelateGenreMovies,
      page: 1,
      total_pages:
        RelateGenreMovies.length > 20
          ? (RelateGenreMovies.length / 20).toFixed(0)
          : 1,
      genre_name: genreName.name,
    };
  }

  static takeVideoList(idvideo) {
    const Videolist = JSON.parse(
      fs.readFileSync(v, "utf-8", (err) => {
        if (err) {
          console.log(err);
          return;
        }
      })
    );
    const VirusfindMovie = Videolist.find((movie) => movie.id === idvideo);
    const VirusconfirmHastrailer = (virus) => {
      return virus.videos.filter(
        (e) =>
          e.site === "YouTube" &&
          e.official === true &&
          e.type === ("Trailer" || "Teaser")
      );
    };
    const VirusFindPublished = VirusconfirmHastrailer(VirusfindMovie);
    const Trailer =
      VirusFindPublished.length > 1
        ? VirusFindPublished.sort((a, b) => a.published_at - b.published_at)
        : VirusFindPublished;
    return Trailer[0];
  }
};

// Lấy dữ liệu từ data xong thao tác logic để biến dữ liệu thô thành dữ liệu chuẩn để hiện ra màn hình

// const Alldatamovies = JSON.parse(
//   fs.readFileSync(p, "utf-8", (err, data) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log(data);
//   })
// );

// thu() {
//   getAlldataMoviesList((data) => {
//     const genreMovies = JSON.parse(
//       fs.readFileSync(g, "utf-8", (err) => {
//         if (err) {
//           console.log(err);
//           return;
//         }
//       })
//     );
//     const genreName = genreMovies.find((e) => e.id === 18); // Lay object genre tuong ung (this.id)
//     const CompareIdGenre = (genreid) => {
//       return genreid.find((id) => id === 18); // Trả về một genre-id mà khách đã nhập (this.id)
//     };
//     const RelateGenreMovies = data.filter((id) =>
//       CompareIdGenre(id.genre_ids)
//     ); // Trả về toàn bộ movies có genre-id tương ứng
//     return {
//       results: RelateGenreMovies,
//       page: 1,
//       total_pages:
//         RelateGenreMovies.length > 20
//           ? (RelateGenreMovies.length / 20).toFixed(0)
//           : 1,
//       genre_name: genreName.name,
//     };
//   });
// }
