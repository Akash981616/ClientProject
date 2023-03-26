import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as loginApi } from "../api";
import Loader from "../components/Loader";
import { alertBox } from "../utils/AlertDailog";
import { AuthContext } from "../context";
import avatar from "../assets/Login/avatar.svg";
import LoginMobile from "../assets/Login/LoginMobile.svg";
import "./Login.css";
function Login() {
  const navigate = useNavigate();
  const [mobile_no, set_mobile_no] = useState("");
  const [password, set_password] = useState("");
  const [isLoading, set_isLoading] = useState(false);

  const { login, user } = useContext(AuthContext);
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    set_isLoading(true);
    const { error, data } = await loginApi({ mobile_no, password });
    set_isLoading(false);

    if (error?.message) {
      alertBox({ error, data });
    } else {
      login(data?.token, data?.data);
    }
  };

  useEffect(() => {
    if (user) navigate(user?.role === "admin" ? "admin" : "/createForm");
  }, [navigate, user]);

  return (
    <div>
      <img
        className="wave"
        src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/wave.png"
        alt="error"
      />
      <div className="container">
        <div className="img">
          <img src={LoginMobile} alt="error" />
        </div>
        <div className="login-content">
          <form>
            <img src={avatar} alt="error" />
            <h2 className="title">Welcome</h2>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <input
                  type="text"
                  className="input"
                  placeholder="UserName"
                  onChange={(e) => set_mobile_no(e.target.value)}
                />
              </div>
            </div>
            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-lock"></i>
              </div>
              <div className="div">
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  onChange={(e) => set_password(e.target.value)}
                />
              </div>
            </div>
            <Link>Forgot Password?</Link>
            <input
              type="submit"
              style={{ marginLeft: 16 }}
              className="btn"
              onClick={handleSubmit}
              value="Login"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
{
  /* <section className="h-screen max-w-4xl mx-auto">
      <div className="px-6 h-full text-gray-800">
        <div className="flex justify-center items-center flex-wrap h-full g-6">
          <form
            className="flex flex-col justify-center items-center space-y-5"
            onSubmit={handleSubmit}
          >
            <div>
              <input
                onChange={(ev) => set_mobile_no(ev.target.value)}
                value={mobile_no}
                required
                type="text"
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleFormControlInput2"
                placeholder="Mobile No"
              />
            </div>

            <div>
              <input
                onChange={(ev) => set_password(ev.target.value)}
                value={password}
                required
                type="password"
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleFormControlInput2"
                placeholder="Password"
              />
            </div>

            <button type="submit" className="btn">
              {isLoading ? <Loader /> : "Login"}
            </button>
            <p className="text-sm font-semibold mt-2">
              Don't have an account?
              <Link
                to="/signup"
                className="text-red-600 hover:text-red-700 ml-1 -focus:text-red-700 transition duration-200 ease-in-out"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section> */
}
export default Login;
