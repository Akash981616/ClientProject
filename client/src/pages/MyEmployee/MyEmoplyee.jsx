import React, { useContext, useEffect, useMemo, useState } from "react";
// import { getAllForms } from "../api";
import { getAllEmployeeForms } from "../../api";
import Table from "../../components/Table";
import { AuthContext } from "../../context";
import moment from "moment";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
// import Loader from "../components/Loader";
import { Box, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

function MyEmployee() {
  const { token, user } = useContext(AuthContext);
  console.log(user);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  const updateTable = (page) => {
    getAllEmployeeForms({
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
        Header: "Employee Name",
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
      // {
      //   Header: "Download",
      //   accessor: "_id",
      //   callback: (id) => {
      //     return (
      //       <form method="post" action={`/api/user/download-ppt/${id}`}>
      //         <input type="hidden" value={token} name="authorization" />
      //         <button type="submit">
      //           <CloudDownloadIcon />
      //         </button>
      //       </form>
      //     );
      //   },
      //   // onClick: (id) => {
      //   //   getFormPpt({ id, token });
      //   // },
      // },
    ]
    // [token]
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
    <Container>
      <h1 className="mb-6 text-4xl font-bold">Add Employee</h1>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          justifyContent: "space-around",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { sm: "row", xs: "column" },
            alignItems: "center",
            justifyContent: { xs: "center", sm: "flex-end" },
            marginBottom: "10px",
            width: "100%",
          }}
        >
          <Button
            onClick={() => {
              navigate("/admin/add-employee");
            }}
            sx={{
              alignItems: "left",
              backgroundColor: "#15803d",
              color: "white",
              my: 1,
              paddingX: "15px",
              ":hover": {
                backgroundColor: "#15803d",
                color: "white",
              },
            }}
          >
            Add Employee
          </Button>
        </Box>
        <Table
          columns={columns}
          datas={data}
          updateTable={updateTable}
          count={count}
        />
      </Container>
    </Container>
  );
}

export default MyEmployee;
