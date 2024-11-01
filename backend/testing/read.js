const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

const getUserData = (req, res) => {
  const filePath = path.join(__dirname, "data.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }

    if (data && data.length === 0) {
      return res.status(404).json({
        status: "successfull",
        message: "No users found",
      });
    }

    return res.status(200).json({
      status: "successfull",
      message: JSON.parse(data),
    });
  });
};

app.get("/api/user", getUserData);

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
