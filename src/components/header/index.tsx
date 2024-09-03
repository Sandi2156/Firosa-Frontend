import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";

const Header = ({
  isLoggedIn,
  onLogout,
}: {
  isLoggedIn: boolean;
  onLogout: () => void;
}) => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: object, newValue: number) => {
    setValue(newValue);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* Left Section: Logo and Tabs */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Box
            component="img"
            src="#"
            alt="Logo"
            sx={{ height: 40, verticalAlign: "middle", marginRight: 2 }}
          />
          My Website
        </Typography>

        <Tabs
          value={value}
          onChange={handleChange}
          textColor="inherit"
          indicatorColor="secondary"
          sx={{ flexGrow: 1 }}
        >
          <Tab label="Home" />
          <Tab label="About" />
        </Tabs>

        {/* Right Section: Auth Buttons */}
        {isLoggedIn ? (
          <Button color="inherit" onClick={onLogout}>
            Logout
          </Button>
        ) : (
          <>
            <Button color="inherit">Login</Button>
            <Button variant="outlined" color="inherit" sx={{ ml: 2 }}>
              Sign Up
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
