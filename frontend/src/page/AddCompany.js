import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { common } from "../utils/api";

const AddCompany = () => {
  let navigate = useNavigate();
  const [Company, setCompany] = useState({
    name: "",
    logoUrl: "",
  });

  const addCompanyFn = async () => {
    try {
      let response = await axios.post(`${common.baseUrl}/company`, Company);
      navigate("/viewCompany");
    } catch (error) {}
  };

  const handlerChange = (e) => {
    setCompany({ ...Company, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
              Company Name
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
              Logo 
            </label>

            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                name="logoUrl"
                onChange={(e) => handlerChange(e)}
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-4">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={() => addCompanyFn()}
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

export default AddCompany;
