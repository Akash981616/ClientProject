import {
  Autocomplete,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { calcLength } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../utils";
import "./AddList.css";
const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
];
export const AddList = () => {
  let navigate = useNavigate();
  const [listDetail, setListDetail] = useState({
    store_name: "",
    address: "",
    area: "",
    contact_number: "",
    company_id: "",
    visit_by: "",
  });
  const [companyList, setComapnyList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [employee, setEmployee] = useState("");

  const onSubmit = async () => {
    try {
      console.log(listDetail);
      let response = await axios.post(
        `${baseUrl}/company/companyAddList`,
        listDetail
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handlerChange = (e) => {
    console.log(e.target.name, e.target.value);
    setListDetail({ ...listDetail, [e.target.name]: e.target.value });
  };
  const preLoadData = async () => {
    try {
      const [companyListResponse, employeListResponse] = await Promise.all([
        axios.get(`${baseUrl}/company`),
        axios.get(`${baseUrl}/company/employee/user/list`),
      ]);
      setComapnyList(companyListResponse?.data.data);
      setEmployeeList(employeListResponse.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    preLoadData();
  }, []);

  return (
    <div className="h-full w-full   flex-row align-middle justify-between">
      <h1 className="mb-6 text-4xl font-bold">Add Employee</h1>
      <div className="flex justify-between w-full  mt-10 ">
        <div
          className=""
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: 300 },
          }}
          noValidate
          autoComplete="off"
        >
          <p>Store Name</p>
          <TextField
            onChange={(e) => handlerChange(e)}
            sx={{ width: 300 }}
            id="outlined-basic"
            placeholder="Enter First Name"
            name="store_name"
            value={listDetail.store_name}
            variant="outlined"
          />
          <span style={{ height: "21px" }}></span>
        </div>
        <div
          className=""
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: 300 },
          }}
          noValidate
          autoComplete="off"
        >
          <p>SelectCompany</p>
          <Select
            sx={{ width: 300 }}
            value={listDetail.company_id}
            name="company_id"
            onChange={(e) => handlerChange(e)}
          >
            {companyList.map((cmpny, idx) => (
              <MenuItem key={idx} value={cmpny._id}>
                {cmpny.name}
              </MenuItem>
            ))}
          </Select>
          <span style={{ height: "21px" }}></span>
        </div>
        <div
          className=""
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: 300 },
          }}
          noValidate
          autoComplete="off"
        >
          <p>Visited By</p>
          <Select
            sx={{ width: 300 }}
            value={listDetail.visit_by}
            name="visit_by"
            onChange={(e) => handlerChange(e)}
          >
            {employeeList.map((cmpny, idx) => (
              <MenuItem key={idx} value={cmpny._id}>
                {cmpny.name}
              </MenuItem>
            ))}
          </Select>
          <span style={{ height: "21px" }}></span>
        </div>
      </div>
      <div className="flex justify-between w-full   mt-10 ">
        <div
          className=""
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: 300 },
          }}
          noValidate
          autoComplete="off"
        >
          <p>Contact Number</p>
          <TextField
            onChange={(e) => handlerChange(e)}
            name="contact_number"
            sx={{ width: 300 }}
            value={listDetail.contact_number}
            id="outlined-basic"
            placeholder="Enter Contact Number"
            variant="outlined"
          />
          <span style={{ height: "21px" }}></span>
        </div>
        <div
          className=""
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: 300 },
          }}
          autoComplete="off"
        >
          <p>Address</p>
          <TextField
            onChange={(e) => handlerChange(e)}
            name="address"
            value={listDetail.address}
            sx={{ width: 300 }}
            id="outlined-basic"
            placeholder="Enter Address"
            variant="outlined"
          />
          <span style={{ height: "21px" }}></span>
        </div>
        <div
          className=""
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: 300 },
          }}
        >
          <p>Area</p>
          <TextField
            onChange={(e) => handlerChange(e)}
            name="area"
            sx={{ width: 300 }}
            id="outlined-basic"
            placeholder="Enter Area"
            variant="outlined"
            value={listDetail.area}
          />
          <span style={{ height: "21px" }}></span>
        </div>
      </div>
      {/* second col */}
      <div className="service-input-button-container">
        <button onClick={() => onSubmit()}>Save</button>
        <button className="service-fade-button" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </div>
  );
};
