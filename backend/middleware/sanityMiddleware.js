const sanityMiddleware = (req, res, next) => {
  if (req.method === "POST") {
    const resp = req.body;

    const isEmpty = Object.keys(resp).length === 0;

    if (isEmpty) {
      res.status(400).json({
        status: "failure",

        message: "Empty request body",
      });
    } else {
      next();
    }
  } else {
    next();
  }
};

module.exports = sanityMiddleware;
