const express = require("express");
const company = require("../controllers/company");
const {
  addCompanyValidator,
  addCompanyListValidator,
  addEmployeeValidator
} = require("../middleware/validator");

const router = express.Router();

router.post("/", addCompanyValidator, company.companyAddFn);
router.get("/", company.companyListFn);
router.get("/:companyId", company.companyDetailFn);
router.delete("/:companyId", company.companyDeleteFn);
router.put("/updateAdditionalInformation/:companyId", company.companyUpdateAdditionalInformationFn);

router.post("/companyAddList", addCompanyListValidator, company.companyAddListFn);
router.get("/list/store/:storeId", company.companyListSotreByIdFn);
router.get("/employee/list", company.companyEmployeeListFn);
// router.delete("/employee/list/:companyId", company.companyEmployeeDeleteByIdFn);
router.delete("/list/store/:storeId", company.companyDeleteListSotreByIdFn);

// add employee
router.post("/employee", addEmployeeValidator, company.employeeAddFn);
router.get("/employee/user/list", company.employeeListFn);
router.get("/name/employee/:employeeId", company.employeeCompnayNameByIdFn);
router.get("/name/employee/company/:companyId", company.employeeCompnayNameByCompanyIdFn);



module.exports = router;
