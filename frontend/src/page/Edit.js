import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { common } from "../utils/api";
const Edit = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userDetail, setuserDetail] = useState({});

  const getUserFn = async () => {
    try {
      const response = await axios.get(
        `${common.baseUrl}/user/${userId}`,
        common.header
      );
      setuserDetail(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    getUserFn();
  }, []);

  const handlerChange = (e) => {
    setuserDetail({ ...userDetail, [e.target.name]: e.target.value });
  };
  console.log(userDetail);
  const editFn = async () => {
    try {
      await axios.put(
        `${common.baseUrl}/user/${userId}`,
        userDetail,
        common.header
      );
      navigate("/user");
    } catch (error) {}
  };
  return (
    <>
      <h3 className="text-center  mt-5">Edit User</h3>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
              Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                name="fullName"
                value={userDetail.fullName}
                onChange={(e) => handlerChange(e)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
              Email
            </label>

            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                name="email"
                value={userDetail.email}
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

export default Edit;
