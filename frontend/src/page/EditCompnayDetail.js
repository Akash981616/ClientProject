import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { common } from "../utils/api";
const EditCompanyDetail = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const [companyDetail, setCompanyDetail] = useState({});

  const getUserFn = async () => {
    try {
      const response = await axios.get(
        `${common.baseUrl}/company/${companyId}`,
        common.header
      );
      setCompanyDetail(response.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    getUserFn();
  }, []);

  const handlerChange = (e) => {
    setCompanyDetail({ ...companyDetail, [e.target.name]: e.target.value });
  };
  console.log(companyDetail, "detail");
  const editFn = async () => {
    try {
      await axios.put(
        `${common.baseUrl}/company/updateAdditionalInformation/${companyId}`,
        companyDetail,
        common.header
      );
      navigate("/viewCompany");
    } catch (error) {}
  };
  return (
    <>
      <h3 className="text-center  mt-5"> Company Name: {companyDetail.name}</h3>
      <div className="container">
        <div className="row">
          {/* <div className="col-md-4">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
              Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                name="fullName"
                value={companyDetail.name}
                onChange={(e) => handlerChange(e)}
              />
            </div>
          </div> */}
          <div className="col-md-4">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
              Total Works
            </label>

            <div className="col-sm-10">
              <input
                type="number"
                className="form-control"
                name="total"
                value={companyDetail.total}
                onChange={(e) => handlerChange(e)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
              Completed
            </label>

            <div className="col-sm-10">
              <input
                type="number"
                className="form-control"
                name="completed"
                value={companyDetail.completed}
                onChange={(e) => handlerChange(e)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
              Pending
            </label>

            <div className="col-sm-10">
              <input
                type="number"
                className="form-control"
                name="pending"
                value={companyDetail.pending}
                onChange={(e) => handlerChange(e)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
              Cancelled
            </label>

            <div className="col-sm-10">
              <input
                type="number"
                className="form-control"
                name="cancelled"
                value={companyDetail.cancelled}
                onChange={(e) => handlerChange(e)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
              Revisit
            </label>

            <div className="col-sm-10">
              <input
                type="number"
                className="form-control"
                name="revisit"
                value={companyDetail.revisit}
                onChange={(e) => handlerChange(e)}
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-4">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={() => editFn()}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditCompanyDetail;
