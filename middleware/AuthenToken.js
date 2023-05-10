const fs = require("fs");

const path = require("path");

const t = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "userToken.json"
);

exports.AuthenticationToken = async (req, res, next) => {
  try {
    const tokenUser = req.params.usertoken;
    if (!tokenUser) throw new Error("Unauthorized");
    const dataToken = JSON.parse(
      fs.readFileSync(t, "utf-8", (err, data) => {
        if (err) {
          console.log(err);
        }
      })
    );
    const confirm = dataToken.find((data) => data.token === tokenUser);
    if (confirm) {
      res.status(200); //.redirect("/api/movies/trending/1"); //
      next();
    } else {
      throw new Error("Invalid user Token");
    }
  } catch {
    res.status(401).json({ message: "Unauthorized" });
    // next(new Error("Unauthorized"));
    // throw new Error("Invalid user Token");
  }
};
