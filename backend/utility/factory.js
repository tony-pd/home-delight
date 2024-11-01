const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const promisify = require("util").promisify;

const secret = "secret";
const sign = promisify(jwt.sign);

const createFactory = (ElementModel) => {
  return async (req, res) => {
    try {
      const element = await ElementModel.create(req.body);
      res.status(201).json({
        status: "success",
        message: "Element created successfully",
        element: element,
      });
    } catch (err) {
      res.status(500).json({
        status: "failure",
        message: err.message,
      });
    }
  };
};

/* const transformQueryHelper = (query) => {
  let parseQuery = query;
  const queryOperators = {
    gt: "$gt",
    gte: "$gte",
    lt: "$lt",
    lte: "$lte",
  };

  for (let key in parseQuery) {
    if (queryOperators[key]) {
      parseQuery[`$${key}`] = parseQuery[key];
      delete parseQuery[key];
    }
  }
  return parseQuery;
}; */

const getAllFactory = (ElementModel) => {
  return async (req, res) => {
    try {
      const query = req.query;
      const sortQuery = query.sort;
      const selectQuery = query.select;

      let myQuery = query.myQuery;
      let page = query.page;
      let limit = query.limit;

      let elements;

      if (myQuery) {
        //const transformedQuery = transformQueryHelper(myQuery);
        elements = await ElementModel.find(myQuery);
      } else {
        elements = await ElementModel.find();
      }

      if (elements.length === 0) {
        throw new Error("No elements found");
      }

      if (sortQuery) {
        let [field, order] = sortQuery.split("_");
        order = order == "desc" ? -1 : 1;

        elements = await ElementModel.find().sort({ [field]: order });
        /*
        elements = elements.sort((a, b) => {
          let fieldA = a[field].toLowerCase();
          let fieldB = b[field].toLowerCase(); 

          if (fieldA < fieldB) {
            return order === "asc" ? -1 : 1;
          } 

          if (fieldA > fieldB) {
            return order === "asc" ? 1 : -1;
          }
          return 0;
        }); */
      }

      if (selectQuery) {
        elements = await ElementModel.find().select(selectQuery);
        /*
        const fields = selectQuery.split("_"); 

        elements = elements.map((item) => {
          let myObj = {}; 

          fields.forEach((field) => {
            if (item[field]) {
              myObj = { ...myObj, [field]: item[field] };
            }
          });

          return myObj;
        }); */
      }

      page = page || 1;
      linit = limit || 2;

      const elementToSkip = (page - 1) * limit;

      //elements = await ElementModel.find().skip(elementToSkip).limit(limit);

      console.log(elements);

      res.status(200).json({
        status: "success",
        message: "Elements fetched successfully",
        elements: elements,
      });
    } catch (err) {
      res.status(500).json({
        status: "failure",
        message: err.message,
      });
    }
  };
};

const getTopFactory = (ElementModel) => {
  return async (req, res, next) => {
    try {
      req.query.myQuery = {
        $and: [
          {
            discount: {
              $lt: 10,
            },
          },
          {
            averageRating: {
              $gte: 4,
            },
          },
        ],
      };

      next();
    } catch (err) {
      res.status(500).json({
        status: "failure",
        message: err.message,
      });
    }
  };
};

const getByIdFactory = (ElementModel) => {
  return async (req, res) => {
    try {
      const id = req.params.id;
      const element = await ElementModel.findById(id);
      if (!element) {
        throw new Error("Element not found");
      }
      res.status(200).json({
        status: "success",
        message: "Element fetched successfully",
        element: element,
      });
    } catch (err) {
      res.status(500).json({
        status: "failure",
        message: err.message,
      });
    }
  };
};

const getByCategoryFactory = (ElementModel) => {
  return async (req, res) => {
    try {
      const category = JSON.parse(req.query.category);
      const element = await ElementModel.find({category: { $in: category }});
      if (!element) {
        throw new Error("Element not found");
      }
      res.status(200).json({
        status: "success",
        message: "Element fetched successfully",
        element: element,
      });
    } catch (err) {
      res.status(500).json({
        status: "failure",
        message: err.message,
      });
    }
  };
};

const deleteByIdFactory = (ElementModel) => {
  return async (req, res) => {
    try {
      const id = req.params.id;
      const element = await ElementModel.findByIdAndDelete(id);
      if (!element) {
        throw new Error("Element not found");
      }
      res.status(200).json({
        status: "success",
        message: "Element deleted successfully",
        element: element,
      });
    } catch (err) {
      res.status(500).json({
        status: "failure",
        message: err.message,
      });
    }
  };
};

const signUpfactory = (ElementModel) => {
  return async function (req, res) {
    try {
      const newUser = await ElementModel.create(req.body);

      res.status(201).json({
        message: "User created",
        newUser,
      });
    } catch (err) {
      res.status(400).json({
        message: err.message,
      });
    }
  };
};

const loginFactory = (ElementModel) => {
  return async function (req, res) {
    try {
      const { email, password } = req.body;
      const user = await ElementModel.findOne({ email });

      if (user) {
        const areEqual = password === user.password;

        if (areEqual) {
          const token = await sign({ id: user._id }, secret);

          res.cookie("jwt", token, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
            secure: true,
          });

          res.status(200).json({
            message: "user logged in",
            data: user
          });
        } else {
          res.status(400).json({
            message: "Invalid credentials",
          });
        }
      } else {
        res.status(400).json({
          message: "user not found",
        });
      }
    } catch (err) {
      res.status(400).json({
        message: err.message,
      });
    }
  };
};

const hashPassword = async (password) => {
  const randomSalt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, randomSalt);
  const isSame = await bcrypt.compare(password, hash);
  console.log("same", isSame);
  return hash;
};
hashPassword('abc123').then((hashedPassword) => {
  console.log('hashing done', hashedPassword);
}).catch((err) => {
  console.log(err);
});

module.exports = {
  createFactory,
  getAllFactory,
  getByIdFactory,
  getByCategoryFactory,
  deleteByIdFactory,
  getTopFactory,
  signUpfactory,
  loginFactory,
};
