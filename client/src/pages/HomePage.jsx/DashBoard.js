import React, { useContext, useEffect, useMemo, useState } from "react";

import moment from "moment";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
// import Loader from "../components/Loader";
import { Box, Button, Container, List, Paper } from "@mui/material";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Sidebar from "../../components/siderBar/SideBar";
import TableComponent from "../../components/Table";
import { getAllForms } from "../../api";
import { AuthContext } from "../../context";

function DashBoard() {
  const { token, user, loading } = useContext(AuthContext);
  console.log(user);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  const updateTable = (page) => {
    getAllForms({
      token: token,
      skip: page * 10,
      limit: 10,
    }).then(({ error, data }) => {
      setData(data?.data.length > 0 ? data.data : []);
      setCount(data.count);
    });
  };

  useEffect(() => {
    if (token) updateTable(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Shop NAme",
        accessor: "shop_name",
      },
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "GST",
        accessor: "gst",
      },
      {
        Header: "Created By",
        accessor: "user.createdBy",
      },
      {
        Header: "Created At",
        accessor: "createdAt",
        callback: (value) => {
          return moment(value).format("DD-MM-YYYY");
        },
      },
      {
        Header: "Download",
        accessor: "_id",
        callback: (id) => {
          return (
            <form method="post" action={`/api/user/download-ppt/${id}`}>
              <input type="hidden" value={token} name="authorization" />
              <button type="submit">
                <CloudDownloadIcon />
              </button>
            </form>
          );
        },
        // onClick: (id) => {
        //   getFormPpt({ id, token });
        // },
      },
    ],
    [token]
  );

  // if (isLoading)
  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         alignItems: "center",
  //         justifyContent: "center",
  //       }}
  //     >
  //       <Loader />
  //     </div>
  //   );

  return (
    <div className="AppGlass">
      <Sidebar />
      <div className="w-full px-20 py-20 ">
        <Outlet />
      </div>
    </div>
  );
}
// const data = (
//   <Container
//     className="mt-10"
//     sx={{
//       display: "flex",
//       flexDirection: "column",
//       // alignItems: "flex-end",
//     }}
//   >
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: { sm: "row", xs: "column" },
//         alignItems: "center",
//         justifyContent: { xs: "center", sm: "flex-end" },
//         marginBottom: "10px",
//         width: "100%",
//       }}
//     >
//       {user?.role === "admin" && (
//         <Button
//           style={{ marginRight: "10px" }}
//           onClick={() => {
//             navigate("/createUser");
//           }}
//           sx={{
//             alignItems: "left",
//             backgroundColor: "#15803d",
//             color: "white",

//             ":hover": {
//               backgroundColor: "#15803d",
//               color: "white",
//             },
//           }}
//         >
//           Create User
//         </Button>
//       )}
//       <Button
//         onClick={() => {
//           navigate("/createForm");
//         }}
//         sx={{
//           alignItems: "left",
//           backgroundColor: "#15803d",
//           color: "white",
//           my: 1,
//           paddingX: "15px",
//           ":hover": {
//             backgroundColor: "#15803d",
//             color: "white",
//           },
//         }}
//       >
//         Create PPT
//       </Button>
//     </Box>

//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: { sm: "row", xs: "column" },
//         alignItems: "center",
//         justifyContent: { xs: "center", sm: "flex-end" },
//         marginBottom: "10px",
//         width: "100%",
//       }}
//     >
//       {user?.role === "admin" && (
//         <Button
//           style={{ marginRight: "10px" }}
//           onClick={() => {
//             navigate("/listEmployee");
//           }}
//           sx={{
//             alignItems: "left",
//             backgroundColor: "#15803d",
//             color: "white",

//             ":hover": {
//               backgroundColor: "#15803d",
//               color: "white",
//             },
//           }}
//         >
//           Employee List
//         </Button>
//       )}
//     </Box>
//     <TableComponent
//       columns={columns}
//       datas={data}
//       updateTable={updateTable}
//       count={count}
//     />
//   </Container>
// );
export default DashBoard;
