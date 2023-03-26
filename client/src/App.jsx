import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Loader from "./components/Loader";
import { AuthContext } from "./context";
import CreateForm from "./pages/CreateForm";
import CreateUser from "./pages/CreateUser";
import ListEmployee from "./pages/ListEmployee";
import ListForm from "./pages/ListForm";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import "./pages/App.css";
import DashBoard from "./pages/HomePage.jsx/DashBoard";
import { AddList } from "./components/AddList/AddList";
import EditCompany from "./pages/EditCompany/EditCompany";
import MyEmployee from "./pages/MyEmployee/MyEmoplyee";
import AddEmployee from "./pages/MyEmployee/AddEmployee";
function Protected({ children, isAuthenticated }) {
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return children;
}

const routes = {
  admin: [
    {
      path: "/dashboard",
      element: <ListForm />,
    },
    {
      path: "/listEmployee",
      element: <ListEmployee />,
    },
    {
      path: "/createForm",
      element: <CreateForm />,
    },
    {
      path: "/createUser",
      element: <CreateUser />,
    },
  ],
  reccee: [
    {
      path: "/createForm",
      element: <CreateForm />,
    },
  ],
};

function App() {
  const { isAuthenticated, loading, user, token } = useContext(AuthContext);
  if (loading)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Loader />
      </div>
    );

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="admin" element={<DashBoard />}>
          <Route index element={<ListEmployee />} />
          <Route path="add-List" element={<AddList />} />
          <Route path="my-employee" element={<MyEmployee />} />
          <Route path="add-employee" element={<AddEmployee />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
