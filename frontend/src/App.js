import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import Signup from "./component/Signup";
import Login from "./component/Login";
import User from "./page/User";
import Header from "./common/Header";
import ProtectedRoute from "./component/ProtectedRoute";
import Edit from "./page/Edit";
import AddCompany from "./page/AddCompany";
import ViewCompany from "./page/ViewCompany";
import AddList from "./page/AddList";
import ViewAddList from "./page/ViewAddList";
import EditCompanyDetail from "./page/EditCompnayDetail";
import ViewEmployee from "./page/ViewEmployee";
import ViewEmployeeCompany from "./page/ViewEmployeeCompany";
import ViewEmployeeCompanyListDetail from "./page/ViewEmployeeCompanyListDetail";
import AddEmployee from "./page/AddEmployee";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          {/* <Route path="/user" element={<User />} />
          <Route path="/edit/:userId" element={<Edit />} /> */}

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addCompany" element={<AddCompany />} />
        <Route path="/viewCompany" element={<ViewCompany />} />
        <Route path="/addList" element={<AddList />} />
        <Route path="/viewAddList/:storeId" element={<ViewAddList />} />
        <Route path="/EditCompanyDetail/:companyId" element={<EditCompanyDetail />} />
        <Route path="/ViewEmployee" element={<ViewEmployee />} />
        <Route path="/ViewEmployeeCompnay/:employeeId" element={<ViewEmployeeCompany />} />
        <Route path="/ViewEmployeeCompnayListDetail/:companyId" element={<ViewEmployeeCompanyListDetail />} />
        <Route path="/addEmployee" element={<AddEmployee />} />

        </Route>
        {/* <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addCompany" element={<AddCompany />} />
        <Route path="/viewCompany" element={<ViewCompany />} />
        <Route path="/addList" element={<AddList />} />
        <Route path="/viewAddList/:storeId" element={<ViewAddList />} />
        <Route path="/EditCompanyDetail/:companyId" element={<EditCompanyDetail />} />
        <Route path="/ViewEmployee" element={<ViewEmployee />} />
        <Route path="/ViewEmployeeCompnay/:employeeId" element={<ViewEmployeeCompany />} />
        <Route path="/ViewEmployeeCompnayListDetail/:companyId" element={<ViewEmployeeCompanyListDetail />} />
        <Route path="/addEmployee" element={<AddEmployee />} /> */}
     

        
      </Routes>
    </>
  );
}

export default App;
