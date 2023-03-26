import React, { Fragment, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Box, Container } from "@mui/system";
import { Button } from "@mui/material";
const MyCompany = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const columns = useMemo(
    () => [
      {
        Header: "CompanyName",
        accessor: "name",
      },
      {
        Header: "Total Works",
        accessor: "shop_name",
      },
      {
        Header: "Pending",
        accessor: "address",
      },
      {
        Header: "Cancelled",
        accessor: "gst",
      },
      {
        Header: "Revist",
        accessor: "user.createdBy",
      },
      {
        Header: "View Company",
        accessor: "user.createdBy",
      },
      {
        Header: "Edit",
        accessor: "user.createdBy",
      },
      {
        Header: "Deletet",
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
  const fetchTableData = async () => {
    try {
    } catch (error) {}
  };
  return (
    <Fragment>
      <Container>
        <Box>
          <Button
            style={{ marginRight: "10px" }}
            onClick={() => {
              navigate("/createUser");
            }}
            sx={{
              alignItems: "left",
              backgroundColor: "#15803d",
              color: "white",

              ":hover": {
                backgroundColor: "#15803d",
                color: "white",
              },
            }}
          >
            Add Company
          </Button>

          <Button
            onClick={() => {
              navigate("/createForm");
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
            fds
          </Button>
        </Box>
      </Container>
    </Fragment>
  );
};

export default MyCompany;
