import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signup } from "../api";

import Loader from "../components/Loader";
import { alertBox } from "../utils/AlertDailog";

function CreateUser() {
  const navigate = useNavigate();
  const [name, set_name] = useState("");
  const [mobile_no, set_mobile_no] = useState("");
  const [password, set_password] = useState("");
  const [role, set_role] = useState("");
  const [isLoading, set_isLoading] = useState(false);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    set_isLoading(true);
    const { error } = await signup({ name, mobile_no, password, role });
    set_isLoading(false);
    alertBox({ error, data: { message: "User Created Successfully" } }).then(
      (e) => navigate("/ListForm")
    );
  };

  return (
    <section className="h-screen max-w-4xl mx-auto">
      <div className="px-6 h-full text-gray-800">
        <div className="flex justify-center items-center flex-wrap h-full g-6">
          <form
            className="flex flex-col justify-center items-center space-y-5"
            onSubmit={handleSubmit}
          >
            <div>
              <input
                onChange={(ev) => set_name(ev.target.value)}
                value={name}
                required
                type="text"
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleFormControlInput2"
                placeholder="Name"
              />
            </div>
            <div>
              <input
                onChange={(ev) => set_mobile_no(ev.target.value)}
                value={mobile_no}
                required
                type="text"
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleFormControlInput2"
                placeholder="Mobile No"
              />
            </div>

            <div>
              <input
                onChange={(ev) => set_password(ev.target.value)}
                value={password}
                required
                type="password"
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="exampleFormControlInput2"
                placeholder="Password"
              />
            </div>

            <div>
              <select
                onChange={(ev) => set_role(ev.target.value)}
                value={role}
                required
                placeholder="Name"
              >
                <option value="reccee">Reccee</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button type="submit" className="btn">
              {isLoading ? <Loader /> : "Create"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default CreateUser;
