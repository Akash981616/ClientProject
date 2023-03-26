import React, { useState, useEffect } from "react";
import axios from "axios";
import { common } from "../utils/api";
import { Link } from "react-router-dom";

const ViewCompany = () => {
  const [companyRecord, setCompanyRecord] = useState([]);

  const ViewCompanyFn = async () => {
    try {
      let response = await axios.get(`${common.baseUrl}/company`, common.header);
      setCompanyRecord(response.data.data);
    } catch (error) {}
  };

  const deleteFn = async (companyId) => {
    try {
      let response = axios.delete(
        `${common.baseUrl}/company/${companyId}`,
        common.header
      );
      ViewCompanyFn();
    } catch (error) {}
  };

  useEffect(() => {
    ViewCompanyFn();
  }, []);
  // console.log(companyRecord)

  const UserTableRow = companyRecord.map((item, index) => {
    return (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>{item.name}</td>
        <td>{item.total}</td>
        <td>{item.completed}</td>
        <td>{item.pending}</td>
        <td>{item.cancelled}</td>
        <td>{item.revisit}</td>
        {/* <td>{item.email}</td> */}
        {/* <td>{item.password}</td> */}
        <td>
          <Link to={`/viewAddList/${item._id}`}>View Company</Link>
        </td>
        <td>
            <Link to={`/EditCompanyDetail/${item._id}`}>edit</Link> 
        </td>
        <td>
          <button onClick={() => deleteFn(item._id)}>delete</button>
        </td>
        {/* <td>{item._id}</td> */}
      </tr>
    );
  });
  return (
    <>
      <div className="container">
        <div className="row">
          <Link to={`/addCompany`}>Add Company</Link><br/>
          <Link to={`/addList`}>Add List</Link>
          <div className="col-md-4">
            <table className="table mt-5">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Company Name</th>
                  <th scope="col">Total Works</th>
                  <th scope="col">Completed</th>
                  <th scope="col">Pending</th>
                  <th scope="col">Cancelled</th>
                  <th scope="col">Revist</th>
                  <th scope="col">View Company</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>{UserTableRow}</tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewCompany;
