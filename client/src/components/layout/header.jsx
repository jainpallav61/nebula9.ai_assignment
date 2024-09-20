import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Automated Blogging Assistant
        </Typography>
        {isAuthenticated ? (
          <>
            <Button color="inherit" component={Link} to="/create-draft">
              Create Draft
            </Button>
            <Button color="inherit" component={Link} to="/view-drafts">
              View Drafts
            </Button>
            <Button color="inherit" component={Link} to="/generate-content">
              Generate Content
            </Button>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
