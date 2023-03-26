import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { common } from "../utils/api";

const AddList = () => {
  let navigate = useNavigate();
  const [AddList, setAddList] = useState({
    store_name: "",
    address: "",
    area: "",
    contact_number: "",
    company_id: "",
    visit_by: "",
  });

  const [companyRecord, setCompanyRecord] = useState([]);
  const [employeeRecord, setEmployeeRecord] = useState([]);

console.log(AddList)

  const addListFn = async () => {
    try {
      let response = await axios.post(`${common.baseUrl}/company/companyAddList`, AddList);
      navigate("/viewCompany");
    } catch (error) {}
  };

  const handlerChange = (e) => {
    setAddList({ ...AddList, [e.target.name]: e.target.value });
  };


  const ViewCompanyFn = async () => {
    try {
      let response = await axios.get(`${common.baseUrl}/company`, common.header);
      setCompanyRecord(response.data.data);
    } catch (error) {}
  };

  const ViewEmployeeFn = async () => {
    try {
      let response = await axios.get(`${common.baseUrl}/company/employee/user/list`, common.header);
      setEmployeeRecord(response.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    ViewCompanyFn();
    ViewEmployeeFn();
  }, []);

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
              Store Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                name="store_name"
                onChange={(e) => handlerChange(e)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
              Address 
            </label>

            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                name="address"
                onChange={(e) => handlerChange(e)}
              />
            </div>
          </div>

          <div className="col-md-4">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
              Area 
            </label>

            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                name="area"
                onChange={(e) => handlerChange(e)}
              />
            </div>
          </div>

          <div className="col-md-4">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
              Contact Number 
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

          <div className="col-md-4">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
              Company Name 
            </label>

            <div className="col-sm-10">
              <select name="company_id"
                onChange={(e) => handlerChange(e)}>
                  <option selected>Select Company</option>
                {
                    companyRecord.map((item,index)=>{
                       return <option value={item._id} key={index}>{item.name}</option>
                    })
                }
              
              </select>
            </div>
          </div>

          <div className="col-md-4">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
              Visit By Employee Id
              {/* Employee name */}
            </label>

            <div className="col-sm-10">
            <select name="visit_by"
                onChange={(e) => handlerChange(e)}>
                  <option selected>Select Employee</option>
                {
                    employeeRecord.map((item,index)=>{
                       return <option value={item._id} key={index}>{item.EmployeeId}</option>
                    })
                }
              
              </select>
</div>
            {/* <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                name="visit_by"
                onChange={(e) => handlerChange(e)}
              />
            </div> */}
          </div>
          <div className="row mt-4">
            <div className="col-md-4">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={() => addListFn()}
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

export default AddList;
