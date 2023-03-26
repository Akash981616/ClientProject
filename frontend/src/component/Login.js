import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { common } from "../utils/api";
const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    mobile_no: "",
    password: "",
  });
  const [error, setError] = useState();
  const [isType, setisType] = useState(false);

  const loginFn = async () => {
    try {
      let response = await axios.post(`${common.baseUrl}/auth/login`, login);
      localStorage.setItem("userToken", response.data.token);
      navigate("/");
    } catch (error) {
      setisType(false);
      setError(error.response.data.message);
    }
  };

  const handlerChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
    setisType(true);
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">
              Mobile Number
            </label>
            <div className="col-sm-10">
              <input
                type="type"
                className="form-control"
                name="mobile_no"
                onChange={(e) => handlerChange(e)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">
              Password
            </label>

            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={(e) => {
                  handlerChange(e);
                }}
              />
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-4">
              <button className="btn btn-primary" onClick={() => loginFn()}>
                Login
              </button>
              {!isType && (
                <p className="mt-4 text-center" style={{ color: "red" }}>
                  {error && error}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
