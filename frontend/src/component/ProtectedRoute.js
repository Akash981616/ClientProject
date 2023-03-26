import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Login from "./Login";
const ProtectedRoute = () => {
  const navigate = useNavigate();
  let isLogin = localStorage.getItem("userToken");
  return isLogin ? <Outlet /> : <Login />;
};

export default ProtectedRoute;
