const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const { DB_USER, DB_PASSWORD } = process.env;

const app = express();

const PORT = process.env.PORT || 3000;

const dbURL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.may1etf.mongodb.net/food?retryWrites=true&w=majority&appName=Cluster0`;
//mongodb+srv://bifiti4729:csxSrDy9wpcUVeBk@cluster0.may1etf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

mongoose
  .connect(dbURL)
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());

const UserRouter = require("./routes/UserRouter");
const ProductRouter = require("./routes/ProductRouter");
const cookieParser = require("cookie-parser");

const jwt = require("jsonwebtoken");
const emailSender = require("./email/email_sender");
const promisify = require("util").promisify;
const cors = require("cors");
const { baseUrl, clientUrl } = require("./constants");

const sign = promisify(jwt.sign);
const verify = promisify(jwt.verify);

app.use("/api/v1/user", UserRouter);
app.use("/api/v1/product", ProductRouter);

app.get("/categories", (req, res) => {
  const categories = [
    {
      label: "Home",
      value: "home",
    },
    {
      label: "Features",
      value: "features",
    },
    {
      label: "Menu",
      value: "menu",
    },
    {
      label: "Contact us",
      value: "contact",
    }
  ];
  res.status(200).json(categories);
});

app.get("/products/categories", (req, res) => {
  const categories = ["breakfast", "lunch", "dinner"];
  res.status(200).json(categories);
});

// listening for all the http request
app.listen(PORT, function () {
  console.log(`server is listening at port ${PORT}`);
});

const corsOptions = {
  origin: clientUrl,
  methods: 'GET,POST,PUT,DELETE',
  //allowedHeaders: 'Content-Type,Authorization',
  credentials: true
};

//app.use(cors(corsOptions));
app.use(cors());
app.use(cookieParser());

app.get("/set-cookie", function (req, res) {
  res.cookie("myCookie", "home", {
    maxAge: 6000000,
    httpOnly: true,
  });

  res.status(200).json({
    message: "Thanks for visiting",
  });
});

app.get("/get-cookie", function (req, res) {
  let msg = "";
  if (req.cookies.myCookie) {
    msg = "you came from " + req.cookies.myCookie;
  }

  res.status(200).json({
    message: `Thansk for visiting products page ${msg}`,
  });
});

app.get("/clear-cookie", function (req, res) {
  res.clearCookie("myCookie", { path: "/" });

  res.status(200).json({
    message: "cookie cleared",
  });
});

const payload = "1234";
const secret = "secret";

app.get("/sign", async function (req, res) {
  try {
    const authToken = await sign({ data: payload }, secret);

    res.cookie("jwt", authToken, {
      httpOnly: true,
    });

    res.status(200).json({
      message: "token signed",
      authToken,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

app.get("/verify", async function (req, res) {
  try {
    const authToken = await req.cookies.jwt;
    const decoded = verify(authToken, secret);
    console.log(decoded.data);
    res.status(200).json({
      message: "token verified",
      decoded,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});

app.post("/send-email", function (req, res) {
  const { name, email } = req.body;

  emailSender(email, "welcome mail", "welcome.html", {
    name: name,
    message: "Thank you for joining our platform. We are excited to have you on board!"  
  });

  res.status(200).json({
    message: "email sent"
  })
})

app.use(function (req, res) {
    console.log("recieved the request");
    res.status(404).json({
      message: "resource not found",
    });
});
  
module.exports = app;
