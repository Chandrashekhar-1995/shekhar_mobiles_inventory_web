import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";

const Sidebar = () => {
  const menuItems = [
    { text: "Dashboard", icon: <BarChartIcon />, link: "/dashboard" },
    { text: "Online Store", icon: <ShoppingCartIcon />, link: "/store" },
    { text: "Purchase", icon: <ShoppingCartIcon />, link: "/purchase" },
    { text: "Inventory", icon: <HomeIcon />, link: "/inventory" },
    { text: "Accounts", icon: <PeopleIcon />, link: "/accounts" },
    { text: "Settings", icon: <SettingsIcon />, link: "/settings" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box", backgroundColor: "#0B72B9", color: "#fff" },
      }}
    >
      <Box
        sx={{
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <Typography variant="h6" noWrap>
          Admin Panel
        </Typography>
      </Box>
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            component="a"
            href={item.link}
            key={index}
            sx={{
              "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
            }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
