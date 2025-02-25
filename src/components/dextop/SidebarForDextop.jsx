import React, { useState } from "react";
import { useNavigate,  Link } from "react-router-dom";
import { Drawer, List, ListItem, ListItemIcon, ListItemText,  Popover, Typography, Box } from "@mui/material";
import { ShoppingCart, Inventory, People,  BarChart,  Settings,  AccountBalance,  AssignmentLate,  InterpreterMode,  AutoFixHigh,  AllInclusive, } from "@mui/icons-material";
import ConstructionIcon from '@mui/icons-material/Construction';

const SidebarForDextop = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [submenuItems, setSubmenuItems] = useState([]);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    {
      text: "Sale",
      icon: <BarChart />,
      subMenu: [
        { text: "New Invoice", link: "/sales/invoice/create" },
        { text: "Manage Invoice", link: "/sales/invoice" },
      ],
    },
    {
      text: "Repairs",
      icon: <ConstructionIcon/>,
      subMenu: [
        { text: "Book Repairing", link: "/repair/booking" },
        { text: "Manage Repairing", link: "/repair" },
      ],
    },
    {
      text: "Purchase",
      icon: <ShoppingCart />,
      subMenu: [
        { text: "New Purchase", link: "/purchase/invoice/create" },
        { text: "Manage Purchase", link: "/purchase/invoice" },
        { text: "Manage Supplier", link: "/purchase/supplier" },
        { text: "Add Supplier", link: "/purchase/supplier/create" },
      ],
    },
    {
      text: "Inventory",
      icon: <Inventory />,
      subMenu: [
        { text: "Add Stock Adjustment", link: "/inventory/add_stock_adjustment" },
        { text: "Search and Manage Stock Adjustment", link: "/inventory/search_stock_adjustment" },
        { text: "Physical Stock Reconciliation", link: "/inventory/stock_reconciliation" },
        { text: "Low Stock", link: "/inventory/low-stock" },
      ],
    },
    {
      text: "Expense", icon: <AssignmentLate/>, subMenu: [
      { text: "Direct Expense", link: "/expense/direct" },
      { text: "Indirect Expense", link: "/expense/indirect" },      
    ]
    },
    { text: "Customer", icon: <People/>, subMenu: [
      { text: "Add Customer", link: "/auth/user/customer/create" },
    ]
    },
    { text: "Tools", icon: <AutoFixHigh/>, subMenu: [
      { text: "Import Customer", link: "/auth/user/customer/bulk-upload" },
      { text: "Import Item", link: "/product/bulk-upload" },
    ]
     },
    { text: "Master", icon: <AllInclusive/>, subMenu: [
      { text: "Add Product", link: "/product/create" },
    ]
    },
    { text: "Settings", icon: <Settings />, link: "/settings" },
  ];

  const handleMouseEnter = (event, subMenu, miniSubMenu) => {
    if (subMenu.length > 0) {
      setAnchorEl(event.currentTarget);
      setSubmenuItems(subMenu);
      setPopoverOpen(true);
    } else {
      setPopoverOpen(false);
    }
  };

  const handleMouseLeave = () => {
    setPopoverOpen(false);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#0B72B9",
          color: "#fff",
        },
      }}
    >
      {/* Sidebar Header */}
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

      {/* Sidebar Menu */}
      <List>
      {menuItems.map((menuItem, index) => (
                        <ListItem
                          key={index}
                          type="button"
                          onClick={(e) => {
                            if(menuItem.subMenu?.length){
                            handleMouseEnter(e, menuItem.subMenu);
                          } else if(menuItem.link){
                            navigate(menuItem.link);
                          }
                            }}
                          onMouseLeave={handleMouseLeave}
                          className="w-full p-2 text-left hover:bg-blue-950 hover:bg-opacity-50"
                        >
                          <ListItemIcon sx={{ color: "#fff" }}>{menuItem.icon}</ListItemIcon>
                          <ListItemText primary={menuItem.text} />
                        </ListItem>
        ))}
      </List>
      {/* Submenu Popover */}
      <Popover
        open={popoverOpen}
        anchorEl={anchorEl}
        onClose={handleMouseLeave}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{
          sx: {
            backgroundColor: "#fff",
            color: "#000",
            width: 200,
            boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
          },
        }}
        disableRestoreFocus 
        onMouseEnter={() => setPopoverOpen(true)} 
        onMouseLeave={handleMouseLeave} 
      >
        <List>
          {submenuItems.map((subItem, subIndex) => (
            <ListItem
              key={subIndex}
              type="button"
              component={Link}
              to={subItem.link}
              sx={{ "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.1)" }, }}
            >
                <ListItemText primary={subItem.text} /> </ListItem>
            ))}
        </List>
      </Popover>
    </Drawer>
  );
};

export default SidebarForDextop;
