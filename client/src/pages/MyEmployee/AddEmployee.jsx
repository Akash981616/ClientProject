import { TextField } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const AddEmployee = () => {
  const navigate = useNavigate();
  return (
    <div className="h-full w-full   flex-row align-middle justify-between   ">
      <h1 className="mb-6 text-4xl font-bold">Add Employee</h1>
      {/* first col */}

      {/* <FormHeader value={14} /> */}
      <div className="flex w-full  mt-10 ">
        <div
          className=""
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: 300 },
          }}
          noValidate
          autoComplete="off"
        >
          <p>Employee Name</p>
          <TextField
            className="w-100"
            id="outlined-basic"
            placeholder="Enter Employee Name"
            variant="outlined"
          />
          <span style={{ height: "21px" }}></span>
        </div>
        <div
          className="ml-20"
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: 300 },
          }}
          noValidate
          autoComplete="off"
        >
          <p>Employe Phone No</p>
          <TextField
            className="w-100"
            id="outlined-basic"
            placeholder="Enter Employe Phone No"
            variant="outlined"
          />
          <span style={{ height: "21px" }}></span>
        </div>
      </div>

      {/* second col */}

      <div className="service-input-button-container">
        <button>Save</button>
        <button
          className="service-fade-button"
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default AddEmployee;
