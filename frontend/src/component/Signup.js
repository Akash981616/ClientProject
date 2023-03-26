import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { common } from "../utils/api";

const Signup = () => {
  let navigate = useNavigate();
  const [signup, setsignup] = useState({
    name: "",
    password: "",
  });

  const signupFn = async () => {
    try {
      let response = await axios.post(`${common.baseUrl}/auth/signup`, signup);
      navigate("/login");
    } catch (error) {}
  };

  console.log(signup);
  const handlerChange = (e) => {
    setsignup({ ...signup, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
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
          {/* <div className="col-md-4">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
              Email
            </label>

            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                name="email"
                onChange={(e) => handlerChange(e)}
              />
            </div>
          </div> */}
          <div className="col-md-4">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
              Password
            </label>

            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                name="password"
                onChange={(e) => handlerChange(e)}
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-4">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={() => signupFn()}
              >
                Signup
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
