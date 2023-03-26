import { AppBar, Button, Toolbar } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context";

import { Box } from "@mui/system";

function Header() {
  const navigate = useNavigate();
  const { logout, isAuthenticated, user } = useContext(AuthContext);
  return (
    <AppBar
      position="static"
      style={{ background: "#15803d", marginBottom: "25px" }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: { xs: "flex" } }}>
          {/* <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton> */}
          <Box sx={{ flexGrow: 1 }}>
            <Button
              onClick={() => {
                navigate(user?.role === "admin" ? "/listForm" : "/createForm");
              }}
              sx={{ my: 2, color: "white" }}
            >
              Home
            </Button>
          </Box>
          {isAuthenticated && (
            <>
              <Button
                color="inherit"
                onClick={(e) => {
                  logout();
                  navigate("/");
                }}
                className="mr-16 text-white "
              >
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
