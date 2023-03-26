import React, { useState, useEffect } from "react";
import axios from "axios";
import { common } from "../utils/api";
import { Link } from "react-router-dom";

const User = () => {
  const [userRecord, setUser] = useState([]);

  const userFn = async () => {
    try {
      let response = await axios.get(`${common.baseUrl}/user`, common.header);
      setUser(response.data);
    } catch (error) {}
  };

  const deleteFn = async (userId) => {
    try {
      let response = axios.delete(
        `${common.baseUrl}/user/${userId}`,
        common.header
      );
      userFn();
    } catch (error) {}
  };

  useEffect(() => {
    userFn();
  }, []);

  const UserTableRow = userRecord.map((item, index) => {
    return (
      <tr key={index}>
        <th scope="row">{index + 1}</th>
        <td>{item.fullName}</td>
        <td>{item.email}</td>
        <td>{item.password}</td>
        <td>
          <Link to={`/edit/${item._id}`}>edit</Link>
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
          <div className="col-md-4">
            <table className="table mt-5">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Password</th>
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

export default User;
