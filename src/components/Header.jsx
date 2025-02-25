import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Avatar, Menu, MenuItem, Typography } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleLogout } from "../utils/logout";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store)=> store.user);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = async () => {
    setAnchorEl(null);
    await handleLogout(dispatch, navigate);
  };

  const handleProfileClick = async () =>{
    if (user?.designation) {
      const role = user.designation;
      const userRoles = [
        "Relationship Manager",
        "Marketing Executive",
        "Manager",
        "Accountant",
        "Clerk",
        "Peon",
        "Office Boy",
        "Receptionist",
        "Trainee",
        "Admin",
      ];

      if (userRoles.includes(role)) {
        navigate("/auth/user/profile");
      } else {
        navigate("/user/profile");
      }
    } else {
      navigate("/login");
    }
  };


  const handleDashboardClick = () => {
    if (user?.designation) {
      const role = user.designation;
      const userRoles = [
        "Relationship Manager",
        "Marketing Executive",
        "Manager",
        "Accountant",
        "Clerk",
        "Peon",
        "Office Boy",
        "Receptionist",
        "Trainee",
      ];

      if (role === "Admin") {
        navigate("/auth/admin");
      } else if (userRoles.includes(role)) {
        navigate("/auth/user");
      } else {
        navigate("/user/dashboard");
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <AppBar position="static" className="bg-primary">
      <Toolbar className="flex justify-between items-center">
        {/* Logo and Shop Name */}
        <div className="flex items-center space-x-2">
          <Typography variant="h6" className="font-bold text-white">
            Shekhar Mobiles
          </Typography>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-4">
          <a href="/" className="text-white hover:underline">
            Home
          </a>
          <a href="/services" className="text-white hover:underline">
            Services
          </a>
          <a href="/shop" className="text-white hover:underline">
            Shop
          </a>
          <a href="/about-us" className="text-white hover:underline">
            About Us
          </a>
          <IconButton color="inherit" href="/cart">
            <ShoppingCart />
          </IconButton>
        </div>

        {/* Profile Avatar and Dropdown */}
        <div className="relative">
          <IconButton onClick={handleMenuOpen}>
            <Avatar src="/path-to-avatar.jpg" alt="Profile" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          >
            <MenuItem onClick={handleProfileClick}> Profile </MenuItem>
            <MenuItem onClick={handleDashboardClick}> Dashboard </MenuItem>

            { user ? 
            <MenuItem onClick={handleLogoutClick}>Logout</MenuItem> : 
            <MenuItem onClick={handleMenuClose} component="a" href="/login">
                Login
              </MenuItem>
            }

          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
