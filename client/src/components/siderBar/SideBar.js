import React, { useState } from "react";
import "./SideBar.css";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { SidebarData } from "../../utils/SideData";
import { UilBars } from "@iconscout/react-unicons";

import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
const Sidebar = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(0);
  const [expanded, setExpaned] = useState(true);
  const sidebarVariants = {
    true: {
      left: "0",
    },
    false: {
      left: "-60%",
    },
  };
  return (
    <>
      <div
        className="bars"
        style={expanded ? { left: "60%" } : { left: "5%" }}
        onClick={() => setExpaned(!expanded)}
      >
        <UilBars />
      </div>

      {/* logo */}

      {/* <div className="mt-3">
        <img src={Logo} alt="logo" />
        <span>
          Sh<span>o</span>ps
        </span>
        <header>Logo</header>
      </div> */}

      <div className="menu">
        {SidebarData.map((item, index) => {
          return (
            <div
              className={selected === index ? "menuItem active" : "menuItem"}
              key={index}
              onClick={() => {
                navigate(item.path);
                setSelected(index);
              }}
            >
              <item.icon />
              <span>{item.heading}</span>
            </div>
          );
        })}
        {/* signoutIcon */}
        <Tooltip title="Log-Out">
          <div className="menuItem">
            <UilSignOutAlt />
          </div>
        </Tooltip>
      </div>
    </>
  );
};

export default Sidebar;
