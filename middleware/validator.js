const { body } = require("express-validator");
exports.loginValidator = [
  body("mobile_no").not().isEmpty().trim(),
  body("password").not().isEmpty().trim(),
];

exports.signUpValidator = [
  body("name").not().isEmpty().trim(),
  body("password").not().isEmpty().trim(),
];

exports.saveFormValidator = [
  body("shop_name").not().isEmpty().trim(),
  body("address").not().isEmpty().trim(),
  body("phone_no").not().isEmpty().trim(),
  body("gst").not().isEmpty().trim(),
  body("name").not().isEmpty().trim(),
];

exports.addCompanyValidator = [
  body("name").not().isEmpty().trim(),
  // body("logo").not().isEmpty().trim(),
];

exports.addEmployeeValidator = [
  body("name").not().isEmpty().trim(),
  body("contact_number").not().isEmpty().trim(),
  body("EmployeeId").not().isEmpty().trim(),
  // body("logo").not().isEmpty().trim(),
];

exports.addCompanyListValidator = [
  body("store_name").not().isEmpty().trim(),
  body("address").not().isEmpty().trim(),
  body("area").not().isEmpty().trim(),
  body("contact_name").not().isEmpty().trim(),
  body("company_name").not().isEmpty().trim(),
  body("visit_by").not().isEmpty().trim(),
];