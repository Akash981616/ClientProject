const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (req.query.authorization) {
    token = req.query.authorization;
  }

  if (req.body.authorization) {
    token = req.body.authorization;
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decoded.id).select("+active");

  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  // if (!currentUser.active) {
  //   return next(new AppError("The user is disabled.", 401));
  // }

  req.user = currentUser;
  next();
});
