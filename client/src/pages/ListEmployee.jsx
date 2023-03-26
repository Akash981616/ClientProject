import React, {
  Fragment,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
// import { getAllForms } from "../api";
import { getAllEmployeeForms } from "../api";
import Table from "../components/Table";
import { AuthContext } from "../context";
import moment from "moment";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
// import Loader from "../components/Loader";
import { Box, Button, Container, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl, header } from "../utils";
const style = {
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  alignItems: "center",
  justifyContent: "center",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  borderRadius: 5,
  p: 4,
};

function ListEmployee() {
  const [open, setOpen] = React.useState(false);
  const [image, setImage] = useState("");
  const { token, user } = useContext(AuthContext);
  console.log(user);
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setImage("");
    setOpen(false);
  };
  const fetchTableData = async () => {
    try {
      const data = await axios.get(`${baseUrl}/company`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setData(data.data.data);
      console.log(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTableData();
  }, []);
  const updateTable = (page) => {
    // getAllEmployeeForms({
    //   token: token,
    //   skip: page * 10,
    //   limit: 10,
    // }).then(({ error, data }) => {
    //   setData(data?.data.length > 0 ? data.data : []);
    //   setCount(data.count);
    // });
  };

  const choseImage = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };
  const Model = (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className="mb-6 text-4xl font-bold">Add Company</h1>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignSelf: "center",
              alignItems: "center",
            }}
          >
            <div
              className=""
              component="form"
              sx={{
                m: 1,
                width: 300,
              }}
              noValidate
              autoComplete="off"
            >
              <p className="mb-2">Enter Company Name</p>
              <TextField
                className="w-100"
                id="outlined-basic"
                placeholder="Enter Company Name"
                variant="outlined"
              />
              <span style={{ height: "21px" }}></span>
            </div>
            {image && (
              <div class="flex flex-wrap justify-center mt-10">
                <img
                  src={image}
                  class="h-auto max-w-sm rounded-lg shadow-none transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30"
                  alt=""
                />
              </div>
            )}
            <div class="flex justify-center">
              <div class="mb-3  mt-4 w-56">
                <label for="formFileLg" class="mb-2 inline-block">
                  Choose Image
                </label>
                <input
                  onChange={(event) => choseImage(event)}
                  class="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding py-[0.32rem] px-3 font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100"
                  id="formFileLg"
                  type="file"
                />
              </div>
            </div>
          </div>

          {/* second col */}

          <div className="service-input-button-container">
            <button>Save</button>
            <button
              className="service-fade-button"
              onClick={() => handleClose()}
            >
              Back
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
  // useEffect(() => {
  //   if (token) updateTable(0);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [token]);

  const columns = useMemo(
    () => [
      {
        Header: "Company Name",
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
        Header: "Cancelled",
        accessor: "cancelled",
      },
      {
        Header: "pending",
        accessor: "pending",
      },
      {
        Header: "completed",
        accessor: "completed",
      },
      {
        Header: "revisit",
        accessor: "revisit",
      },

      {
        Header: "Created At",
        accessor: "createdAt",
        callback: (value) => {
          return moment(value).format("DD-MM-YYYY");
        },
      },
      {
        Header: "Total",
        accessor: "total",
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
    <Fragment>
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
          {user?.role === "admin" && (
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
              Employee List
            </Button>
          )}
          <Button
            onClick={() => {
              handleOpen();
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
            Create PPT
          </Button>
        </Box>
      </Container>
      {Model}
      <Table
        columns={columns}
        datas={data}
        updateTable={updateTable}
        count={count}
      />
    </Fragment>
  );
}

export default ListEmployee;
