import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { common } from "../utils/api";

const AddEmployee = () => {
  let navigate = useNavigate();
  const [Employee, setEmployee] = useState({
    EmployeeId: "",
    name: "",
    contact_number: "",
  });

  const addEmployeeFn = async () => {
    try {
      let response = await axios.post(`${common.baseUrl}/company/employee`, Employee);
      navigate("/ViewEmployee");
    } catch (error) {}
  };

  const handlerChange = (e) => {
    setEmployee({ ...Employee, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
              Employee Id
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                name="EmployeeId"
                onChange={(e) => handlerChange(e)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
              Name 
            </label>

            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                name="name"
                onChange={(e) => handlerChange(e)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
              Phone Number 
            </label>

            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                name="contact_number"
                onChange={(e) => handlerChange(e)}
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-4">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={() => addEmployeeFn()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEmployee;
