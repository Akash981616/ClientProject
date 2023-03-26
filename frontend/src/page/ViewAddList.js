import React, { useState, useEffect } from "react";
import axios from "axios";
import { common } from "../utils/api";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";

const ViewAddList = () => {
  const { storeId } = useParams();

  const [viewAddListRecord, setViewAddListRecord] = useState([]);
  const [companyName, setCompanyName] = useState([]);

  const viewAddListRecordFn = async () => {
    try {
      let response = await axios.get(`${common.baseUrl}/company/list/store/${storeId}`, common.header);
      setViewAddListRecord(response.data.data.companyList);
      setCompanyName(response.data.data.companyName);
    } catch (error) {}
  };

  const deleteFn = async (storeId) => {
    try {
      let response = axios.delete(
        `${common.baseUrl}/company/list/store/${storeId}`,
        common.header
      );
      viewAddListRecordFn();
    } catch (error) {}
  };

  useEffect(() => {
    viewAddListRecordFn();
  }, []);

  const UserTableRow = viewAddListRecord.map((item, index) => {
    return (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>{item.createdAt}</td>
        <td>{item.visit_by.EmployeeId}</td>
        <td>{item.visit_by.name}</td>
        <td>{item.store_name}</td>
        <td>{item.address}</td>
        <td>{item.contact_number}</td>
        <td>Status</td>
        <td>Download</td>
        <td>  <button onClick={() => deleteFn(item._id)}>delete</button></td>
        {/* <td>{item.email}</td> */}
        {/* <td>{item.password}</td> */}
        <td>
          {/* <Link to={`/edit/${item._id}`}>edit</Link> */}
        </td>
        <td>
          {/* <Link to={`/edit/${item._id}`}>edit</Link> */}
        </td>
        {/* <td>
          <button onClick={() => deleteFn(item._id)}>delete</button>
        </td> */}
        {/* <td>{item._id}</td> */}
      </tr>
    );
  });
  return (
    <>
    <h1>{companyName}</h1>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <table className="table mt-5">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Date</th>
                  <th scope="col">Employee ID</th>
                  <th scope="col">Employee Name</th>
                  <th scope="col">Store Name</th>
                  <th scope="col">Address</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Status</th>
                  <th scope="col">Download</th>
                  <th scope="col">
                    Delete
                  </th>
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

export default ViewAddList;
