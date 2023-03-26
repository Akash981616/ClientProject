const officegen = require("officegen");
var PptxGenJS = require("pptxgenjs");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const signToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET);
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken({
    id: user._id,
  });

  return res.status(statusCode).json({
    status: "Success",
    message: "User Login Succussfully.",
    token,
    data: {
      mobile_no: user.mobile_no,
      name: user.name,
      role: user.role,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new AppError("Validation Error", 422, errors.array()));
  }
  let user = await User.findOne({ mobile_no: req.body.mobile_no });

  if (user) {
    return next(new AppError("User Already Exists", 422, errors.array()));
  }

  user = await User.create(req.body);

  return createSendToken(user, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ ...req.body }).select("+password");

  if (!user) {
    return next(new AppError("Incorrect mobile Number or password", 401));
  }

  return createSendToken(user, 200, res);
});
