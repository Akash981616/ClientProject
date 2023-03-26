import React, { useState, useEffect } from "react";
import axios from "axios";
import { common } from "../utils/api";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";

const ViewEmployeeCompanyListDetail = () => {
  const { companyId } = useParams();
  
  console.log(companyId)

  const [companyRecord, setCompanyRecord] = useState([]);
  const [employeeName, setEmployeeName] = useState([]);


  const ViewCompanyFn = async () => {
    try {
      let response = await axios.get(`${common.baseUrl}/company/name/employee/company/${companyId}`, common.header);
      setCompanyRecord(response.data.data);
      // setEmployeeName(response.data.data.employeeName)
    } catch (error) {}
  };

  const deleteFn = async (storeId) => {
    try {
      let response = axios.delete(
        `${common.baseUrl}/company/list/store/${storeId}`,
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
        <td>{item.store_name}</td>
        <td>{item.address}</td>
        <td>{item.contact_number}</td>
        <td>Pending</td>
        <td><Link>Download</Link></td>
        {/* <td>{item.name}</td>
        <td>{item.contact_number}</td> */}
        {/* <td>{item.total}</td>
        <td>{item.completed}</td>
        <td>{item.pending}</td>
        <td>{item.cancelled}</td>
        <td>{item.revisit}</td> */}
        {/* <td>{item.email}</td> */}
        {/* <td>{item.password}</td> */}
        {/* <td>
          <Link to={`/viewAddList/${item._id}`}>View Company</Link>
        </td> */}
        {/* <td>
            <Link to={`/EditCompanyDetail/${item._id}`}>edit</Link> 
        </td> */}
        <td>
          <button onClick={() => deleteFn(item._id)}>delete</button>
        </td>
        {/* <td>{item._id}</td> */}
      </tr>
    );
  });
  return (
    <>
    {/* <p><strong>Employee:-</strong> {employeeName}</p> */}
      <div className="container">
        <div className="row">
          {/* <Link to={`/addCompany`}>Add Company</Link><br/>
          <Link to={`/addList`}>Add List</Link> */}
          <div className="col-md-4">
            <table className="table mt-5">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Store Name</th>
                  <th scope="col">Address</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col">Status</th>
                  <th scope="col">Download</th>
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

export default ViewEmployeeCompanyListDetail;
