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

// const getAlldataMoviesList = (highfunction) => {
//   const arr = [];
//   fs.readFileSync(p, "utf-8", (err, data) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     highfunction(JSON.parse(data));
//   });
// };

module.exports = class Movies {
  constructor(m) {
    this.id = m;
  }

  static takeTrending(start, end) {
    try {
      const dataTrending = JSON.parse(
        fs.readFileSync(p, "utf-8", (err, data) => {
          if (err) {
            console.log(err);
            throw new Error("Not data movies trending");
          }
          console.log(data);
        })
      );
      const sortDataTrending = dataTrending.sort(
        (a, b) => b.popularity - a.popularity
      );
      return {
        results: sortDataTrending.slice(start, end),
        page: 1,
        total_pages:
          sortDataTrending.length > 20
            ? (sortDataTrending.length / 20).toFixed(0)
            : 1,
      };
    } catch (error) {
      console.log(error);
    }
  }

  static takeRating(start, end) {
    try {
      const dataRating = JSON.parse(
        fs.readFileSync(p, "utf-8", (err, data) => {
          if (err) {
            console.log(err);
            throw new Error("Not data movies rating");
          }
          console.log(data);
        })
      );
      const sortDataRating = dataRating.sort(
        (a, b) => b.vote_average - a.vote_average
      );
      return {
        results: sortDataRating.slice(start, end),
        page: 1,
        total_pages:
          sortDataRating.length > 20
            ? (sortDataRating.length / 20).toFixed(0)
            : 1,
      };
    } catch (error) {
      console.log(error);
    }
  }

  static takegenre(genre, start, end) {
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
    const genreName = genreMovies.find((e) => e.id === Number(genre)); // Lay object genre tuong ung
    if (genreName) {
      const CompareIdGenre = (genreid) => {
        return genreid.find((id) => id === Number(genre)); // Trả về một genre-id mà khách đã nhập
      };
      const RelateGenreMovies = data.filter((movie) =>
        CompareIdGenre(movie.genre_ids)
      ); // Trả về toàn bộ movies có genre-id tương ứng
      return {
        results: RelateGenreMovies.slice(start, end),
        page: 1,
        total_pages:
          RelateGenreMovies.length > 20
            ? (RelateGenreMovies.length / 20).toFixed(0)
            : 1,
        genre_name: genreName.name,
      };
    } else {
      return genreName;
    }
  }

  static takeVideoList(idvideo) {
    const Videolist = JSON.parse(
      fs.readFileSync(v, "utf-8", (err) => {
        if (err) {
          console.log(err);
          throw new Error("Not data video");
        }
      })
    );
    const VirusfindMovie = Videolist.find(
      (movie) => movie.id === Number(idvideo)
    );
    if (VirusfindMovie) {
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
    } else {
      return VirusfindMovie;
    }
  }

  static searchAdvanceData() {
    const genreMovies = JSON.parse(
      fs.readFileSync(g, "utf-8", (err) => {
        if (err) {
          console.log(err);
          return;
        }
      })
    );
    const searchMovie = JSON.parse(
      fs.readFileSync(p, "utf-8", (err, data) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(data);
      })
    );
    return {
      genresId: genreMovies,
      moviesList: searchMovie,
    };
  }

  static searchData(keyword, start, end) {
    const searchMovie = JSON.parse(
      fs.readFileSync(p, "utf-8", (err, data) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(data);
      })
    );
    const findKeywordDetail = (title, overview) => {
      if (title && overview) {
        const arrtitle = title.toLowerCase().split(" ");
        const arroverview = overview.toLowerCase().split(" ");
        const arrKeyword = keyword.toLowerCase().split(" ");
        return (
          arrtitle.find((e) => e === arrKeyword[0]) ||
          arroverview.find((e) => e === arrKeyword[0])
        );
      }
    };
    const sortDataTrending = searchMovie.filter((e) =>
      findKeywordDetail(e.title, e.overview)
    );
    return {
      results: sortDataTrending.slice(start, end),
      page: 1,
      total_pages: Number(
        sortDataTrending.length > 20
          ? (sortDataTrending.length / 20).toFixed(0)
          : 1
      ),
    };
  }
};
