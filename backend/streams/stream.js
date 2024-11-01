const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");

app.get("/", (req, res) => {
  const destPath = path.join(__dirname, "example2.txt");
  const readStream = fs.createReadStream("./example.txt", "utf8");
  const writeStream = fs.createWriteStream(destPath);

  //readStream.pipe(writeStream);

  readStream.on("error", (err) => {
    console.log(err);
  });

  readStream.on("end", () => {
    console.log("done");

    readStream.close();
  });
});

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
