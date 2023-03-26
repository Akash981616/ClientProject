import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
const Header = () => {
  const navigate = useNavigate();
  const isLogin = localStorage.getItem("userToken");
  const logoutFn = () => {
    localStorage.clear("userToken");
    navigate("/login");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg" style={{ background: "black" }}>
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/"}>
            Website
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {isLogin ? (
              <>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex">
                  <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to={"/"}>
                      Home
                    </Link>
                  </li>
                  {/* <li className="nav-item">
                    <Link className="nav-link" to={"/user"}>
                      User
                    </Link>
                  </li> */}

                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      aria-current="page"
                      to={"/viewCompany"}
                    >
                      My Companies
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      aria-current="page"
                      to={"/ViewEmployee"}
                    >
                      My Employess
                    </Link>
                  </li>

                </ul>

                <div className="d-flex" role="search">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex">
                    <li className="nav-item">
                      <button
                        className="nav-link"
                        style={{ backgroundColor: "black" }}
                        onClick={() => logoutFn()}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                  {/* <li className="nav-item dropdown">
       <Link
         className="nav-link dropdown-toggle"
         role="button"
         data-bs-toggle="dropdown"
         aria-expanded="false"
       >
         Dropdown
       </Link>
       <ul className="dropdown-menu">
         <li>
           <Link className="dropdown-item">Sign Up</Link>
         </li>
         <li>
           <Link className="dropdown-item">Login</Link>
         </li>
         <li>
           <Link className="dropdown-item">Something else here</Link>
         </li>
       </ul>
     </li> */}
                </div>
              </>
            ) : (
              <div className="d-flex" role="search">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex">
                  <li className="nav-item">
                    <Link className="nav-link" to={"/login"}>
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      aria-current="page"
                      to={"/signup"}
                    >
                      Sign up
                    </Link>
                  </li>

                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
