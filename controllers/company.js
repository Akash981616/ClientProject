const { default: mongoose } = require("mongoose");
const Company = require("../models/company");
const CompanyAddList = require("../models/companyAddList");
const Employee = require("../models/employee");


const companyAddFn = async (req, res, next) => {

  try {
    let { body:{ name }} = req;
    let company = await Company.findOne({ name });

    if (company) {
      return res.status(422).json({
        status: "failed",
        message: "Company Already Exists.",
      });
    }
  
    company = await Company.create(req.body);
  
    return res.status(200).json({
      status: "Success",
      message: "Company Added Succussfully.",
      data: company,
    });

  } catch (error) {

    return res.status(500).json({
      status: "internal error",
      message: "Company Added Succussfully.",
    });

  }

};

const companyListFn = async (req, res, next) => {

  try {

    let company = await Company.find();
  
    return res.status(200).json({
      status: "Success",
      message: "Company List.",
      data: company,
    });

  } catch (error) {

    return res.status(500).json({
      error: "Error",
      status: "internal Server Error",
      message: "Company Added Succussfully.",
    });

  }

};

const companyDetailFn = async (req, res, next) => {

  try {

    let { params:{ companyId }} = req;
    let company = await Company.findOne({ _id: companyId });

    return res.status(200).json({
      status: "Success",
      message: "Company Details.",
      data: company,
    });

  } catch (error) {

    return res.status(500).json({
      error: "Error",
      status: "internal Server Error",
      message: "Company Added Succussfully.",
    });

  }

};

const companyDeleteFn = async (req, res) => {

  try {

    let { params:{ companyId }} = req;
    let response = await Company.findByIdAndDelete({ _id: companyId });
    let employeeDelete = await CompanyAddList.deleteMany({ company_id: companyId });

    if(!response){
      return res.status(200).json({
        status: false,
        message: "Company not found.",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Company deleted Successfully.",
    });

  } catch (error) {

    return res.status(500).json({
      error: "Error",
      status: false,
      message: "Internal Server Error"
    });

  }

};

const companyUpdateAdditionalInformationFn = async (req, res) => {

  try {

    let { params:{ companyId }, body:{total,  completed, pending, cancelled, revisit}} = req;

    const filter = {
      _id: companyId
    }

    const update = {
      total,
      completed,
      pending,
      cancelled,
      revisit
    } 
      let response = await Company.findByIdAndUpdate( filter, update);

      if(!response){
        return res.status(200).json({
          status: false,
          message: "Company not found.",
        });
      }

      return res.status(200).json({
        status: true,
        message: "Update Successfully.",
      });

  } catch (error) {

    return res.status(500).json({
      error: error.message,
      status: false,
      message: "Internal Server Error",
    });

  }

};

const companyAddListFn = async (req, res, next) => {

  try {
    // let { body:{ store_name, area, contact_name, visit_by, company_name }} = req;
    // let company = await Company.findOne({ store_name, area, contact_name, visit_by, company_name });

    // if (company) {
    //   return res.status(422).json({
    //     status: "failed",
    //     message: "Company Already Exists.",
    //   });
    // }
  
    let companyAddList = await CompanyAddList.create(req.body);
  
    return res.status(200).json({
      status: "Success",
      message: "Company List Added Succussfully.",
      data: companyAddList,
    });

  } catch (error) {

    return res.status(500).json({
      status: "Failed",
      message: "Interal Server Error",
    });

  }

};

const companyListSotreByIdFn= async (req, res, next) => {

  try {
    let { params:{ storeId }} = req;

    let company = await Company.findOne({ _id: storeId });
    let companyName = company.name;
    if (!company) {
      return res.status(422).json({
        status: "failed",
        message: "Company Already Exists.",
      });
    }
  
    const companyId = company._id; 

    try{
      let companyList = await CompanyAddList.find({ company_id: companyId }).populate("visit_by");
      
      return res.status(200).json({
        status: "Success",
        message: "Company Store List Succussfully.",
        data: {companyList, companyName},
      });

    }catch(e){
      console.log(e.message)
    }
  
  } catch (error) {

    return res.status(500).json({
      status: "Failed",
      message: "Interal Server Error",
    });

  }

};

const companyDeleteListSotreByIdFn= async (req, res, next) => {

  try {
    let { params:{ storeId }} = req;

    let response = await CompanyAddList.findByIdAndDelete({ _id: storeId });

    if (!response) {
      return res.status(422).json({
        status: "failed",
        message: "Store Not Exists.",
      });
    }
  
      return res.status(200).json({
        status: true,
        message: "Store deleted Succussfully.",
      });

  
  } catch (error) {

    return res.status(500).json({
      status: false,
      message: "Interal Server Error",
    });

  }

};

const companyEmployeeListFn = async (req, res, next) => {

  try {

    let companyAddList = await CompanyAddList.find();
  
    return res.status(200).json({
      status: "Success",
      message: "Company List.",
      data: companyAddList,
    });

  } catch (error) {

    return res.status(500).json({
      error: "Error",
      status: "internal Server Error",
      message: "Company Added Succussfully.",
    });

  }

};

// add employee
const employeeAddFn = async (req, res, next) => {

  try {
    let { body:{ EmployeeId }} = req;
    let employee = await Employee.findOne({ EmployeeId });

    if (employee) {
      return res.status(422).json({
        status: "failed",
        message: "Employee Already Exists.",
      });
    }
  
    employee = await Employee.create(req.body);
  
    return res.status(200).json({
      status: "Success",
      message: "Employee Added Succussfully.",
      data: employee,
    });

  } catch (error) {

    return res.status(500).json({
      status: "internal error",
      message: "Company Added Succussfully.",
    });

  }

};

const employeeListFn = async (req, res, next) => {

  try {
// console.log("hello")
    let employee = await Employee.find();
  
    return res.status(200).json({
      status: "Success",
      message: "Employee List.",
      data: employee,
    });

  } catch (error) {

    return res.status(500).json({
      error: error.message,
      status: false,
      message: "internal Server Error.",
    });

  }

};

const employeeCompnayNameByIdFn = async (req, res, next) => {

  try {
    let { params:{ employeeId }} = req;

    try{
      // let companyList = await CompanyAddList.find({ visit_by: employeeId }).populate("company_id","name");
      let companyList = await CompanyAddList.find({ visit_by: employeeId }).populate("company_id").populate("visit_by");
      let employeeName = companyList[0].visit_by.name;

      return res.status(200).json({
        status: "Success",
        message: "Company Store List Succussfully.",
        data: {companyList,employeeName},
      });

    }catch(e){
      console.log(e.message)
    }
  
  } catch (error) {

    return res.status(500).json({
      status: "Failed",
      message: "Interal Server Error",
    });

  }

};

const employeeCompnayNameByCompanyIdFn = async (req, res, next) => {

  try {
    let { params:{ companyId }} = req;

    try{
      // let companyList = await CompanyAddList.find({ visit_by: employeeId }).populate("company_id","name");
      let companyList = await CompanyAddList.find({ company_id: companyId });
      // let employeeName = companyList[0].visit_by.name;

      return res.status(200).json({
        status: "Success",
        message: "Company Store List Succussfully.",
        // data: {companyList},
        data: companyList,
      });

    }catch(e){
      console.log(e.message)
    }
  
  } catch (error) {

    return res.status(500).json({
      status: "Failed",
      message: "Interal Server Error",
    });

  }

};

module.exports = {
  companyAddFn,
  companyListFn,
  companyDetailFn,
  companyDeleteFn,
  companyAddListFn,
  companyListSotreByIdFn,
  companyUpdateAdditionalInformationFn,
  companyDeleteListSotreByIdFn,
  companyEmployeeListFn,
  employeeAddFn,
  employeeListFn,
  employeeCompnayNameByIdFn,
  employeeCompnayNameByCompanyIdFn
}

