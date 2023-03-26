import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import { get } from "lodash";
import { useState } from "react";
import { Container, TableFooter, TablePagination } from "@mui/material";

function TableComponent({ columns, datas, updateTable, count }) {
  // Use the state and functions returned from useTable to build your UI

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    updateTable(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    updateTable(0);
  };

  // Render the UI for your table and the styles
  return (
    <>
      <CssBaseline />

      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((column, i) => {
                return (
                  <TableCell key={i + "" + i}>
                    <span style={{ fontWeight: "bolder" }}>
                      {column.Header}
                    </span>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {datas.map((data, index) => {
              return (
                <tr key={index}>
                  {columns.map((column, i) => {
                    return (
                      <TableCell key={i + "" + index}>
                        {column?.callback
                          ? column?.callback(get(data, column.accessor))
                          : get(data, column.accessor)}
                      </TableCell>
                    );
                  })}
                </tr>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[10]}
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}

export default TableComponent;
