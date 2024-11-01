const protectedRouteMiddleware = async (req, res, next) => {
  try {
    if (req.cookies && req.cookies?.jwt) {
      const authToken = await req.cookies?.jwt;
      const decoded = verify(authToken, secret);

      if (decoded) {
        const userId = decoded.id;
        req.userId = userId;
        next();
      }
    }

    res.status(200).json({
      status: "success",
      message: `User fetched successfully ${decoded.id}`,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
      decoded: null,
    });
  }
};

module.exports = protectedRouteMiddleware;
