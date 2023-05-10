const path = require("path");
const fs = require("fs");

const t = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "userToken.json"
);

exports.AuthenticationToken = async (req, res, next) => {
  try {
    const Usertoken = req.params.usertoken;
    const dataToken = JSON.parse(
      fs.readFileSync(t, "utf-8", (err, data) => {
        if (err) {
          console.log(err);
          throw new Error("Not Data");
        }
        console.log(data);
      })
    );
    const validUsertoken = await dataToken.find((e) => {
      return e.token === Usertoken;
    });

    if (validUsertoken) {
      next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
      throw new Error("Token not match");
    }
  } catch (error) {
    console.log(error);
  }
};
